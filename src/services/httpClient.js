import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_BRIDGE_CONTACTFORM_API_KEY;

if(!API_BASE_URL) {
    throw new Error("Base url is not defined");
}

export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "bridgecontactform-api-key": API_KEY,
    },
});
