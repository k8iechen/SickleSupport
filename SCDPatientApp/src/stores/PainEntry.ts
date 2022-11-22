import * as firestore from 'firebase/firestore';
import { db } from '../firebase';
import type { TPatient } from '../models/Patient';
import type { TPainEntry } from '../models/PainEntry';

export interface IPainEntryStore {
  addEntry: (
    patient: TPatient | null | undefined,
    entry: TPainEntry
  ) => Promise<boolean>;
}

export interface IBackend {
  addEntry: (patientId: string, entry: TPainEntry) => Promise<void>,
}

const firestoreBackend = {
  ...firestore,
  addEntry: async (patientId, entry) => {
    await firestore.addDoc(
      firestore.collection(db, 'patients', patientId, 'pain_entries'),
      entry,
    );

    const patientRef = firestore.doc(db, 'patients', patientId);
    await firestore.updateDoc(patientRef, {
      pain_episodes: firestore.increment(1),
    });
    if (entry.hospital_visit) {
      await firestore.updateDoc(patientRef, {
        hospital_visit: firestore.increment(1),
      });
    }
  },
} as IBackend;

const PainEntryStore = (backend:IBackend = firestoreBackend): IPainEntryStore => {
  const store: IPainEntryStore = {
    addEntry: async (
      patient: TPatient | null | undefined,
      entry: TPainEntry,
    ): Promise<boolean> => {
      try {
        const patientId = patient?.uid?.toString();
        if (!patientId) {
          console.log('there is no patient in the auth context');
          return false;
        }

        await backend.addEntry(patientId, entry);

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  };

  return store;
};

export default PainEntryStore;
