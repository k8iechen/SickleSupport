import { db } from "../firebase";
import { TPatient } from "../models/Patient";
import { TDiaryEntry } from "../models/DiaryEntry";
import { addDoc, collection } from "firebase/firestore";

export interface IDiaryStore {
  addEntry: (
    patient: TPatient | null,
    entry: TDiaryEntry
  ) => Promise<boolean>;
}

const DiaryStore = (): IDiaryStore => {
  const store: IDiaryStore = {
    addEntry: async (
      patient: TPatient | null,
      entry: TDiaryEntry
    ): Promise<boolean> => {
      try {
        const patientId = patient?.uid?.toString();
        if (patientId) {
          await addDoc(collection(db, "patients", patientId, "diaries"), entry);
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

export default DiaryStore;
