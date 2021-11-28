import { db } from "../firebase";
import { TPatient } from "../models/Patient";
import { TDiaryEntry } from "../models/DiaryEntry";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export interface IDiaryStore {
  addDiaryEntry: (
    patient: TPatient | null | undefined,
    entry: TDiaryEntry
  ) => Promise<boolean>;
}

const DiaryStore = (): IDiaryStore => {
  const store: IDiaryStore = {
    addDiaryEntry: async (
      patient: TPatient | null | undefined,
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
