import {toast} from "react-toastify";

export const onErrorDefault = (error: any) => {
    toast.error(error.message)
}
