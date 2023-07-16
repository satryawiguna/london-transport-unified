import {onErrorDefault} from "./useError";
import {useQuery} from "@tanstack/react-query";
import {TFLService} from "../services/TFLService";
import {JourneyDto} from "../types/dto/CommonType";

const useFetchAllJournies = (request: JourneyDto, onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-journies', request], TFLService.getAllJournies,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useFetchPlaceByName = (name: string, onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-place-by-name', name], TFLService.getPlaceByName,
        onSuccess ? {onSuccess, onError} : {onError})
}

export {
    useFetchAllJournies,
    useFetchPlaceByName
}
