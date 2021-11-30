import { FieldValue, Timestamp } from "firebase/firestore";

export type TPainEntry = {
  uid?: string;
  created_at: Timestamp | FieldValue;
  updated_at: Timestamp | FieldValue;
  pain_intensity: number;
  medication_taken: boolean;
  tylenols_taken: number;
  anti_inflammatories_taken: number;
  short_acting_opiods_taken: number;
  long_acting_opiods_taken: number;
  location: string;
  pain_triggers: string[];
  relief_methods: string[];
  hospital_visit: boolean;
  notes: string;
};
