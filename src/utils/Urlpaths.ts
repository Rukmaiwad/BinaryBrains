export let BASE_URL = "http://localhost:3000/api/"


/** Route for login using google */
export const GOOGLE_LOGIN_ROUTE =  BASE_URL + 'auth/google';
/** Route for login using mail */
export const MAIL_LOGIN_ROUTE = BASE_URL + 'auth/login';

/** Route for signup using mail */
export const SIGNUP_ROUTE = BASE_URL + 'auth/signup';