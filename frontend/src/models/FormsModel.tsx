
export interface LoginModel {
    email: string;
    password: string;
}

export interface SignupModel {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    DOB: Date;
    status: UserStatus;
}

export type UserStatus = "STUDENT" | "PROFESSIONAL"