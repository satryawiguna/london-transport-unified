import {useQuery} from "@tanstack/react-query";
import {onErrorDefault} from "./useError";
import {CommonService} from "../services/CommonService";

const useFetchAllLanguages = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-languages'], CommonService.getAllLanguages,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useFetchAllTopMenus = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-top-menus'], CommonService.getAllTopMenus,
        onSuccess ? {onSuccess, onError} : {onError})
}

export {
    useFetchAllLanguages,
    useFetchAllTopMenus
}
