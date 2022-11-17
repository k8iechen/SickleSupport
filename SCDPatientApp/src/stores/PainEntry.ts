import { db } from "../firebase";
import { TPatient } from "../models/Patient";
import { TPainEntry } from "../models/PainEntry";
import * as firestore from "firebase/firestore";

export interface IPainEntryStore {
  addEntry: (
    patient: TPatient | null | undefined,
    entry: TPainEntry
  ) => Promise<boolean>;
};

const PainEntryStore = (): IPainEntryStore => {
  const store: IPainEntryStore = {
    addEntry: async (
      patient: TPatient | null | undefined,
      entry: TPainEntry
    ): Promise<boolean> => {
      try {
        const patientId = patient?.uid?.toString();
        if (patientId) {
          await firestore.addDoc(
            firestore.collection(db, "patients", patientId, "pain_entries"),
            entry
          );

          const patientRef = firestore.doc(db, "patients", patientId);
          await firestore.updateDoc(patientRef, {
            pain_episodes: firestore.increment(1),
          });
          if (entry.hospital_visit) {
            await firestore.updateDoc(patientRef, {
              hospital_visit: firestore.increment(1),
            });
          }
          return true;
        } else {
          throw "Error: there is no patient in the auth context";
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  };

  return store;
};

export default PainEntryStore;
