export interface LoginResponse {
    status: number,
    data: LoginResponseBody
}

export interface LoginResponseBody {
    type: string,
    message: string,
    userID: string
}