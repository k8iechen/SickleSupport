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
  // TPatient: patient is signed in
  // null: patient is not signed in
  patient: TPatient | null;
  isAuthenticated: () => boolean;
  stale: boolean;
  setStale: (stale: boolean) => void;
  onAuthStateChange: (firUser: FirAuthUser | null) => void;
  signInAnonymously: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
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
      if (firUser) {
        const docRef = doc(db, 'patients', firUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          store.patient = { uid: firUser.uid, ...docSnap.data() } as TPatient;
        } else {
          store.patient = { uid: firUser.uid } as TPatient;
        }
      } else {
        store.patient = null;
      }
    }),
    signInAnonymously: action(async () => signInAnonymously(auth)),
    signOut: action(async () => {
      await auth.signOut();
    }),
    setPatient: action(async (patient: TPatient) => {
      const { uid, ...data } = patient;
      await setDoc(doc(db, 'patients', uid), data);
      store.patient = patient;
    }),
  });
  return store;
};

export default AuthStore;
