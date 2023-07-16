import {JourneyDto} from "../types/dto/CommonType";
import ApiTFL from "../utils/HttpClientTFL";
import {QueryFunctionContext} from "@tanstack/react-query";
import {AxiosRequestConfig} from "axios";

export const config: AxiosRequestConfig = {
    withCredentials: false
}

export class TFLService {
    static async getAllJournies(request: QueryFunctionContext<[string, JourneyDto]>): Promise<any> {
        const startFrom = request.queryKey[1].startFrom
        const endTo = request.queryKey[1].endTo

        return await ApiTFL().get(`/Journey/JourneyResults/${startFrom}/to/${endTo}/?app_id=${import.meta.env.VITE_TFL_APP_ID}&app_key=${import.meta.env.VITE_TFL_APP_KEY}`, config)
    }

    static async getPlaceByName(request: QueryFunctionContext<[string, string]>): Promise<any> {
        const name = request.queryKey[1]

        return await ApiTFL().get(`/Place/Search?name=${name}&app_id=${import.meta.env.VITE_TFL_APP_ID}&app_key=${import.meta.env.VITE_TFL_APP_KEY}`, config)
    }

    static async getAllAirQualities(request: QueryFunctionContext<[string]>): Promise<any> {
        return await ApiTFL().get(`/AirQuality/?app_id=${import.meta.env.VITE_TFL_APP_ID}&app_key=${import.meta.env.VITE_TFL_APP_KEY}`, config)
    }
}
