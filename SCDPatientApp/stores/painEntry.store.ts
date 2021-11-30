import { db } from "../firebase";
import { TPatient } from "../models/Patient";
import { TPainEntry } from "../models/PainEntry";
import { addDoc, collection } from "firebase/firestore";

export interface IPainEntryStore {
  addEntry: (
    patient: TPatient | null | undefined,
    entry: TPainEntry
  ) => Promise<boolean>;
}

const PainEntryStore = (): IPainEntryStore => {
  const store: IPainEntryStore = {
    addEntry: async (
      patient: TPatient | null | undefined,
      entry: TPainEntry
    ): Promise<boolean> => {
      try {
        const patientId = patient?.uid?.toString();
        if (patientId) {
          await addDoc(
            collection(db, "patients", patientId, "pain_entries"),
            entry
          );

          //   await
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
