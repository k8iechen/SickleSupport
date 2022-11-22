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
  collection: typeof firestore.collection,
  addDoc: typeof firestore.addDoc,
  doc: typeof firestore.doc,
  updateDoc: typeof firestore.updateDoc,
  increment: typeof firestore.increment,
}

const PainEntryStore = (backend?: IBackend): IPainEntryStore => {
  backend = backend || firestore;

  const store: IPainEntryStore = {
    addEntry: async (
      patient: TPatient | null | undefined,
      entry: TPainEntry,
    ): Promise<boolean> => {
      try {
        const patientId = patient?.uid?.toString();
        if (patientId) {
          await backend.addDoc(
            backend.collection(db, 'patients', patientId, 'pain_entries'),
            entry,
          );

          const patientRef = backend.doc(db, 'patients', patientId);
          await backend.updateDoc(patientRef, {
            pain_episodes: backend.increment(1),
          });
          if (entry.hospital_visit) {
            await backend.updateDoc(patientRef, {
              hospital_visit: backend.increment(1),
            });
          }
          return true;
        }
        throw 'Error: there is no patient in the auth context';
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  };

  return store;
};

export default PainEntryStore;
