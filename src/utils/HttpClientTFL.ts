import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const ApiTFL = (): AxiosInstance => {
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

export const setAuthCredentialTFL = () => {
    ApiTFL().interceptors.request.use(function (config: InternalAxiosRequestConfig) {
        config.params['app_id'] = `${import.meta.env.VITE_TFL_APP_ID}`
        config.params['app_key'] = `${import.meta.env.VITE_TFL_APP_KEY}`

        return config;
    }, function (error) {
        return Promise.reject(error);
    })
}

export default ApiTFL
