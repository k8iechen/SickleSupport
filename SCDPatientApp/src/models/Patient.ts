export enum Age {
  Child,
  Preteen,
  Teen,
  Adult,
  Senior,
}

export enum Gender {
  Male,
  Female,
  Other,
}

export type TPatient = {
  uid?: string;
  name: string;
  age?: Age;
  gender?: Gender;
  notification?: number;
  hospital_visits?: number;
  pain_episodes?: number;
};
