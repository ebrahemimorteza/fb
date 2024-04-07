import axios from "axios";

export const jjAxios = axios.create({
    baseURL: "/shoping/Server",
    // baseURL: "/Server",
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    timeout: 50000,
    timeoutErrorMessage: "please wait!",
    proxy: {
        host: 'localhost',
        port: 8080
    }
})
export const jjAxiosUpload = axios.create({
    // baseURL: "/UploadServlet",
    baseURL: "/shoping/UploadServlet",
    timeout: 5000,
    timeoutErrorMessage: "please wait!",
    proxy: {
        host: 'localhost',
        port: 8080
    }
})