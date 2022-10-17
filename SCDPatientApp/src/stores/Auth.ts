import { observable, action } from 'mobx';

import type {
  User as FirAuthUser,
} from 'firebase/auth';

import {
  signInAnonymously,
  UserCredential,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import { TPatient } from '../models/Patient';

export interface IAuthStore {
  isAuthenticated: () => boolean;
  stale: boolean;
  setStale: (stale: boolean) => void;
  onAuthStateChange: (firUser: FirAuthUser | null) => void;
  signInAnonymously: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
  getPatient: () => TPatient | null;
  setPatient: (patient: TPatient) => Promise<void>;
}

const AuthStore = (): IAuthStore => {
  const store: IAuthStore = observable({
    patient: null,
    isAuthenticated: () => store.patient != null,
    stale: false,
    setStale: action((stale: boolean) => {
      store.stale = stale;
    }),
    onAuthStateChange: action(async (firUser: FirAuthUser | null) => {
      if (!firUser) {
        store.patient = null;
        return;
      }

      const docRef = doc(db, 'patients', firUser.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.exists() ? docSnap.data() : {};
      store.patient = { uid: firUser.uid, ...data } as TPatient;
      console.log("onAuthStateChange: patient:", store.patient);
    }),
    signInAnonymously: action(async () => signInAnonymously(auth)),
    signOut: action(async () => {
      await auth.signOut();
    }),
    getPatient: () => {
      return store.patient;
    },
    setPatient: action(async (patient: TPatient) => {
      console.log("setPatient: patient:", patient);
      const { uid, ...data } = patient;
      await setDoc(doc(db, 'patients', uid), data);
      store.patient = patient;
    }),
  });
  return store;
};

export default AuthStore;
