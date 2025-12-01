    import axios from "axios"
    import type { LoginModel, RegisterModel } from "../models/FormsModel";
    import type { LoginResponse } from "../models/ApiResponse";


    export const loginRequest = async (loginModelBody: LoginModel): Promise<LoginResponse> => {
        const response = await axios
            .post(`${import.meta.env.USERS_API_LOGIN_URL}`, {
                email: loginModelBody.email,
                password: loginModelBody.password
            });
        const loginResponse: LoginResponse = {
            status: response.status,
            data: {
                type: response.data.type,
                message: response.data.message,
                userID: response.data.userID
            }
        }
        return loginResponse;
    }

    export const registerRequest: any = async (registerModelBody: RegisterModel) => {
        await axios
            .post(import.meta.env.USERS_API_REQUEST_URL, {
                email: registerModelBody.email,
                password: registerModelBody.password,
                firstname: registerModelBody.firstname,
                lastname: registerModelBody.lastname,
                birthdate: registerModelBody.birthdate
            })
            .then(response => response);
    }   

    export const userData: any = async (user_id: string) => {
        await axios
            .get(`${import.meta.env.USERS_API_URL}/${user_id}`)
            .then(response => response);
    }

    export const updateProfile: any = async (user_id: string, property: string, value: string|Date|number) => {
        await axios
            .put(`${import.meta.env.USERS_API_URL}/${user_id}`, null, {
                params: {
                    property: property,
                    value: value
                }
            })
            .then(response => response);
    }

    export const deleteProfile: any = async (user_id: string) => {
        await axios
            .delete(`${import.meta.env.USERS_API_DELETE_URL}`, {
                params: {
                    userID: user_id
                }
            })
            .then(response => response);
    }