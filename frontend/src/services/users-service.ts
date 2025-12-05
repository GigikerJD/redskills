import axios from "axios"
import type { LoginModel, RegisterModel } from "../models/FormsModel";
import type { DeleteProfileResponse, LoginResponse, RegisterResponse, UpdateProfileResponse, UserDataResponse } from "../models/ApiModel";

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
    if (response.status == 200) {
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
        loginResponse = {
            status: response.status,
            data: {
                type: response.data.type,
                message: response.data.message
            }
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
    if (response.status == 200) {
        registerResponse = {
            status: response.status,
            data: {
                type: response.data.type,
                message: response.data.type,
                token: response.data.token,
                userID: response.data.userID
            }
        }
        return registerResponse;
    } else {
        registerResponse = {
            status: response.status,
            data: {
                type: response.data.type,
                message: response.data.type
            }
        }
        throw registerResponse;
    }
}   
export const userData = async (user_id: string): Promise<UserDataResponse> => {
    const response = await axios.get(`${API_BASE}/${user_id}`, { validateStatus: () => true });
    let dataResponse: UserDataResponse;
    if (response.status == 200) {
        dataResponse = {
            type: response.data.type,
            status: response.status,
            message: response.data.message,
            user: {
                id: response.data.user.id,
                email: response.data.user.email,
                firstname: response.data.user.firstname,
                lastname: response.data.user.lastname,
                birthdate: new Date(response.data.user.birthdate),
                status: response.data.user.status,
                createdAt: new Date(response.data.user.createdAt),
                updatedAt: new Date(response.data.user.updatedAt)
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
export const updateProfile: any = async (user_id: string, property: string, value: string|Date|number): Promise<UpdateProfileResponse> => {
    const response = await axios.put(`${API_BASE}/${user_id}`, null, {
        params: { property: property, value: value },
        validateStatus: () => true
    })
    const updatedProfileResponse: UpdateProfileResponse = {
        status: response.status,
        type: response.data.type,
        message: response.data.message,
    }
    if (updatedProfileResponse.status === 200) return updatedProfileResponse;
    else throw updatedProfileResponse;
}
export const deleteProfile: any = async (user_id: string): Promise<DeleteProfileResponse> => {
    const response = await axios
        .delete(API_DELETE, {
            params: { userID: user_id },
            validateStatus: () => true
        });
    const deletedProfileResponse: DeleteProfileResponse = {
        status: response.status, message: response.data.message
    };
    if (deletedProfileResponse.status == 200) return deletedProfileResponse;
    else throw deletedProfileResponse;
}