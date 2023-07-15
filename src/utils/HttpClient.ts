import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const Api = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_TFL_API_URL}`,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        withCredentials: true,
        timeout: 100000,
    })

    instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
        return request
    }, (error) => {
        return error
    })

    instance.interceptors.response.use((response: AxiosResponse) => {
        return response.data
    }, (error) => {
        if (!error.response) throw new Error('Error connection')

        return Promise.reject(error.response.data);
    })

    return instance
}

export const setAuthCredential = (token: string) => {
    Api().defaults.headers.common['Authorization'] = '';
    delete Api().defaults.headers.common['Authorization'];

    if (token) {
        Api().defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export default Api
