import { httpClient } from "./httpClient";
import { APP_CONFIG } from "../config/app.config.js";

export const submitContactForm = async (payload) => {
    try {
        const response = await httpClient.post(
            APP_CONFIG.apiRoutes.contactRegisterRoute,
            payload,
        );

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        // Axios error
        if(error.response) {
            return Promise.reject({
                success: false,
                status: error.response.status,
                message: 
                    error.response.data?.message ||
                    "Server rejected the request",
            });
        }
        
        // Network error 
        if(error.request) {
            return Promise.reject({
                success: false,
                status: 0,
                message: "Network error. Please check your connection.",
            });
        }

        // Config/ unknown error
        return Promise.reject({
            success: false,
            status: -1,
            message: "Unexpected error occurred",
        });
    }
};
