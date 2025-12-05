import type { User } from "./UserModel"

export interface LoginResponse {
    status: number,
    data: LoginResponseSuccess | LoginResponseError
}

export interface LoginResponseSuccess {
    type: string,
    message: string,
    userID: string
}

export interface LoginResponseError {
    type: string,
    message: string,
}

export interface RegisterResponse {
    status: number,
    data: RegisterResponseSuccess | RegisterResponseError
}

export interface RegisterResponseSuccess {
    type: string,
    message: string,
    token: string,
    userID: string
}

export interface RegisterResponseError {
    type: string,
    message: string
}

export interface UpdateProfileResponse {
    type: string,
    message: string,
    status: number
}

export interface DeleteProfileResponse {
    type: string,
    status: number,
    message: string
}

export interface UserDataResponse {
    type: string,
    status: number,
    message: string,
    user?: User | null
}