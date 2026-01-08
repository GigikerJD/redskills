import axios from "axios"
import type { LoginModel, RegisterModel } from "../models/FormsModel";
import type { DeleteProfileResponse, LoginResponse, LoginResponseError, RegisterResponse, RegisterResponseError, RegisterResponseSuccess, UpdateProfileResponse, UserDataResponse } from "../models/ApiModel";

const API_BASE = import.meta.env.VITE_USERS_API_URL;
const API_LOGIN = import.meta.env.VITE_USERS_API_LOGIN_URL;
const API_REGISTER = import.meta.env.VITE_USERS_API_REGISTER_URL;
const API_DELETE = import.meta.env.VITE_USERS_API_DELETE_URL;

export const loginRequest = async (loginModelBody: LoginModel): Promise<LoginResponse> => {
    const response = await axios
        .post(API_LOGIN, {
            email: loginModelBody.email,
            password: loginModelBody.password
        }, {
            validateStatus: () => true
        });
    let loginResponse: LoginResponse;
    if (response.status === 200){
        loginResponse = {
            status: response.status,
            data: {
                type: response.data.type,
                message: response.data.message,
                userID: response.data.userID
            }
        }
        return loginResponse;
    } else {
        const myData: LoginResponseError = {
            type: response.data.type,
            message: response.data.message,
        }
        loginResponse = {
            status: response.status,
            data: myData
        }
        throw loginResponse;
    }
}
export const registerRequest = async (registerModelBody: RegisterModel): Promise<RegisterResponse> => {
    const response = await axios
        .post(API_REGISTER, {
            email: registerModelBody.email,
            password: registerModelBody.password,
            firstname: registerModelBody.firstname,
            lastname: registerModelBody.lastname,
            birthdate: registerModelBody.birthdate
        }, {
            validateStatus: () => true
        })
    let registerResponse: RegisterResponse;
    let myData: RegisterResponseSuccess | RegisterResponseError;
    if (response.status === 200) {
        myData = {
            type: response.data.type,
            message: response.data.message,
            token: response.data.token,
            userID: response.data.userID
        }
        registerResponse = {
            status: response.status,
            data: myData
        }
        return registerResponse;
    } else {
        myData = {
            type: response.data.type,
            message: response.data.message
        }
        registerResponse = {
            status: response.status,
            data: myData
        }
        throw registerResponse
    }
}   
export const userData = async (user_id: string): Promise<UserDataResponse> => {
    const response = await axios.get(`${API_BASE}/${user_id}`, { validateStatus: () => true });
    let dataResponse: UserDataResponse;
    if (response.status === 200) {
        dataResponse = {
            type: response.data.type,
            status: response.status,
            message: response.data.message,
            user: {
                id: response.data.user.id,
                email: response.data.user.email,
                firstname: response.data.user.firstname,
                lastname: response.data.user.lastname,
                birthdate: response.data.user.birthdate,
                createdAt: response.data.user.createdAt,
                updatedAt: response.data.user.updatedAt
            }
        }
        return dataResponse;
    } else {
        dataResponse = {
            type: response.data.type,
            message: response.data.message,
            status: response.status,
        }
        throw dataResponse;
    }
}
export const updateProfile = async (user_id: string, property: string, value: string): Promise<UpdateProfileResponse> => {
    const response = await axios.put(`${API_BASE}/${user_id}`, null, {
        params: { property: property, value: value },
        validateStatus: () => true
    })
    const updatedProfileResponse: UpdateProfileResponse = {
        status: response.status,
        type: response.data.type,
        message: response.data.message,
    }
    if (response.status === 200) return updatedProfileResponse;
    else throw updatedProfileResponse;
}
export const deleteProfile: any = async (user_id: string): Promise<DeleteProfileResponse> => {
    const response = await axios
        .delete(API_DELETE, {
            params: { userID: user_id },
            validateStatus: () => true
        });
    const deletedProfileResponse: DeleteProfileResponse = {
        type: response.data.type, status: response.status, message: response.data.message
    };
    if (response.status === 200) return deletedProfileResponse;
    else throw deletedProfileResponse;
}