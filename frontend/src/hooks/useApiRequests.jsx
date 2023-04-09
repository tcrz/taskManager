import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

const useApiRequests = () => {
    const {token} = useContext(AuthContext)
    const reqHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    };

    async function httpPostAsync (url, body) {
        let response = await api.post(url, body, {headers: reqHeaders});
        return response.data;
    }

    async function httpAuthGetAsync (url) {
        let response = await api.get(url, {headers: reqHeaders});
        return response.data;
    }

    async function httpAuthPostAsync (url, body) {
        let response = await api.post(url, body,{headers: reqHeaders});
        return response.data;
    }

    async function httpAuthPutAsync (url, body) {
        let response = await api.put(url, body,{headers: reqHeaders});
        return response.data;
    }

    async function httpAuthDeleteAsync (url, body) {
        let response = await api.delete(url,{headers: reqHeaders, data: body});
        return response.data;
    }
    
    return {
        httpAuthGetAsync,
        httpPostAsync,
        httpAuthPostAsync,
        httpAuthPutAsync,
        httpAuthDeleteAsync
    }
}

export default useApiRequests