import { getToken } from "./token.js";


export function getAuthorizeSettings(other) {
    return {
        ...other,
        headers: { Authorization: `Bearer ${getToken()}` }
    }
}