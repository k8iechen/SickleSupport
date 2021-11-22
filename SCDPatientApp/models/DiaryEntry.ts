import { FieldValue, Timestamp } from "firebase/firestore";

// TODO: all field are required
export type TDiaryEntry = {
  created_at?: FieldValue;
  updated_at?: FieldValue;
  date?: Timestamp;
  sleep?: string;
  sleepHours?: number;
  mood?: number;
  stress?: number;
  stress_causes?: string[];
  medication_compliance?: boolean;
  medications?: string[];
  vision_impaired?: boolean;
  priapism_episode?: boolean;
  leg_ulcers?: boolean;
};
