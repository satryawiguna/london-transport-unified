import {useQuery} from "@tanstack/react-query";
import {onErrorDefault} from "./useError";
import {CommonService} from "../services/CommonService";

const useFetchAllLanguages = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-languages'], CommonService.getAllLanguages,
        onSuccess ? {onSuccess, onError} : {onError})
}

export {
    useFetchAllLanguages
}
