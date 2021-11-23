import { FieldValue, Timestamp } from "firebase/firestore";

// TODO: all field are required
export type TDiaryEntry = {
  created_at: FieldValue;
  updated_at: FieldValue;
  sleepHours: string;
  sleepRating: number;
  mood: string;
  stress: number;
  medication_compliance: boolean;
  medications: string[];
  pain: boolean;
  painType: string;
  vision_impaired: boolean;
  priapism_episode: boolean;
  fever: boolean;
};
