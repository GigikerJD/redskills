import axios from "axios";
import type { ProfileResponse } from "../models/ApiModel";


const API_BASE = import.meta.env.VITE_RESULTS_API_URL;

export const resultRequest = async (userID: string): Promise<ProfileResponse> => {
    const response = await axios
        .get(`${API_BASE}/${userID}`, { validateStatus: () => true });
    let profileResponse: ProfileResponse;
    if (response.status === 200) {
        profileResponse = {
            type: response.data.type,
            status: response.status,
            data: {
                id: response.data.result.id,
                resultDate: response.data.result.resultDate,
                userID: response.data.result.userID,
                profileDisc: response.data.result.profileDisc,
                profilePersonality: response.data.result.profilePersonality
            }
        }
        return profileResponse;
    } else {
        profileResponse = {
            type: response.data.type,
            status: response.status,
            data: null
        }
        return profileResponse;
    }
}