import axios from "axios";

export const baseURL=`https://upskilling-egypt.com:3005`;
export const imgBaseURL='';


export const AUTH_URLS = {
    LOGIN : `/api/auth/login`,
    REGISTER : `/api/auth/register`,
    FORGET_PASSWORD : `/api/auth/forgot-password`,
    RESET_PASSWORD :   `/api/auth/reset-password` ,
    CHANGE_PASSWORD : `/api/auth/change-password`,

}
