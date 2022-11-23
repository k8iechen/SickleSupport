import { observable, action, runInAction } from 'mobx';

import type {
  User as FirAuthUser,
  UserCredential,
} from 'firebase/auth';

import {
  signInAnonymously as firebaseSignInAnonymously,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import type { TPatient } from '../models/Patient';

export interface IAuthStore {
  isAuthenticated: () => boolean;
  stale: boolean;
  setStale: (stale: boolean) => void;
  onAuthStateChange: (firUser: FirAuthUser | null) => void;
  signInAnonymously: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
  wipeOut: () => Promise<void>;
  getPatient: () => TPatient | null;
  setPatient: (_: TPatient) => Promise<void>;
  updatePatient: (fn: (_: TPatient) => TPatient) => Promise<void>;
}

const syncPatientToBackend = async (store: IAuthStore, patient: TPatient) => {
  const { uid, ...data } = patient;
  await setDoc(doc(db, 'patients', uid), data);
  store.setStale(false);
};

const AuthStore = (): IAuthStore => {
  const store = observable({
    patient: null as TPatient | null,
    isAuthenticated: () => store.patient != null,
    stale: false,
    setStale: action((stale: boolean) => {
      store.stale = stale;
    }),
    onAuthStateChange: async (firUser: FirAuthUser | null) => {
      if (!firUser) {
        runInAction(() => {
          store.patient = null;
        });
        return;
      }

      const docRef = doc(db, 'patients', firUser.uid);
      const docSnap = await getDoc(docRef);
      runInAction(() => {
        const data = docSnap.exists() ? docSnap.data() : {};
        store.patient = { uid: firUser.uid, ...data } as TPatient;
      });
    },
    signInAnonymously: async () => firebaseSignInAnonymously(auth),
    signOut: () => {
      return auth.signOut();
    },
    wipeOut: async () => {
      await auth.currentUser?.delete();
      runInAction(() => {
        store.patient = null;
      });
    },
    getPatient: () => {
      return store.patient;
    },
    setPatient: async (patient: TPatient) => {
      runInAction(() => {
        if (store.patient != patient) {
          store.patient = patient;
          store.setStale(true);
        }
      });
      await syncPatientToBackend(store, store.patient!);
    },
    updatePatient: async (updateFn: (_: TPatient) => TPatient) => {
      await runInAction(() => {
        if (store.patient === null) {
          throw new Error("No known patient to update");
        }
        store.setPatient(updateFn(store.getPatient()!));
      });
    },
  });
  return store;
};

export default AuthStore;
