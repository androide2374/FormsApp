import axios, { AxiosInstance } from "axios"

export const ApiForm = () => {
    const instance: AxiosInstance = axios.create({
        baseURL: `http://localhost:5218/api`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return instance
}