export enum Age {
    Child, Preteen, Teen, Adult, Senior
};

export enum Gender {
    Male, Female, Other
};

export enum Notification {
    Morning, Noon, Evening, Other // How is other chosen?
}

export type TUser = {
    uid?: string;
    name: string;
    age?: Age;
    gender?: Gender;
    notification?: Notification
};
