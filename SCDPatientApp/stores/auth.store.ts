import { observable, action } from 'mobx';

import { User as FirAuthUser, signInAnonymously, Auth, UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc, FirestoreError } from "firebase/firestore";
import { auth, db } from "../firebase";

import { TPatient } from "../models/Patient";

export interface IAuthStore {
  // TPatient: patient is signed in
  // null: patient is not signed in
  // undefined: we don't know if the patient is signed in or not
  patient: TPatient | null | undefined;
  stale: boolean;
  setStale: (stale: boolean) => void
  onAuthStateChange: (firUser: FirAuthUser | null) => void
  signInAnonymously: (auth: Auth) => Promise<UserCredential>
  setPatient: (patient: TPatient) => Promise<void>
}

const AuthStore = (): IAuthStore => {
  const store: IAuthStore = observable(
    {
      patient: undefined,
      stale: false,
      setStale: action(async (stale: boolean) => {
        store.stale = stale;
      }),
      onAuthStateChange: action(async (firUser: FirAuthUser | null) => {
        if (firUser) {
          const docRef = doc(db, "patients", firUser!.uid);
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
      signInAnonymously: action(async () => await signInAnonymously(auth)),
      setPatient: action(async (patient: TPatient) => {
        try {
          const { uid, ...data } = patient;
          await setDoc(doc(db, "patients", uid!), data);
          store.patient = patient;
        } catch (error: unknown) {
          if (error instanceof FirestoreError) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          } else {
            console.log(error);
          }
        }
      }),
    }
  );
  return store;
};

export default AuthStore;
