/**
 * Contains the custom hook to send the various requests to the server like get, post, put and delete
 */

import axios from "axios";

// backend url to request the data
const REQUEST_URL = process.env.REQUEST_URL ?? "http://localhost:3000/api/"

export const useRequest = () => {

    return {

        // defining the functions according to the requests
        get: async (url: string) => {
            return (await axios.get(REQUEST_URL + url)).data;
        },

        post: async (url: string, data: unknown) => {
            return(await axios.post(REQUEST_URL + url, data)).data
        },

        put: async (url: string, data: unknown) => {
            return(await axios.put(REQUEST_URL + url, data)).data
        },

        delete: async (url: string) => {
            return(await axios.delete(REQUEST_URL + url)).data
        },

        patch: async (url: string, data: unknown) => {
            return(await axios.patch(REQUEST_URL + url, data)).data
        }

    }
}