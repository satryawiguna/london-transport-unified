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

const useFetchAirQualities = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-air-quality'], TFLService.getAllAirQualities,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useFetchAllBikePoints = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-bike-points'], TFLService.getAllBikePoints,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useFetchAllJourneyPlanners = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-journey-planners'], TFLService.getAllJourneyPlanners,
        onSuccess ? {onSuccess, onError} : {onError})
}

export {
    useFetchAllJournies,
    useFetchPlaceByName,
    useFetchAirQualities,
    useFetchAllBikePoints,
    useFetchAllJourneyPlanners
}
