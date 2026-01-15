import axios from "axios";
import {APP_CONFIG} from "../config/app.config.js";

if(!APP_CONFIG.application.baseURL) {
    throw new Error("Base url is not defined");
}

export const httpClient = axios.create({
    baseURL: APP_CONFIG.application.baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "bridgecontactform-api-key": APP_CONFIG.application.contactFormAPIKey,
    },
});
