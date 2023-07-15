import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommonState {
    isLoading: boolean,
    isDark: boolean,
    lang: string,
    title: string,
    description: string
}

const initialState: CommonState = {
    isLoading: false,
    isDark: false,
    lang: "en",
    title: "TFL Website",
    description: "Transportation of London Unified"
}

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        updateIsLoadingAction: (state, {payload: {isLoading}}: PayloadAction<any>) => {
            state.isLoading = isLoading
        },
        updateIsDarkAction: (state, {payload: {isDark}}: PayloadAction<any>) => {
            state.isDark = isDark
        },
        updateLangAction: (state, {payload: {lang}}: PayloadAction<any>) => {
            state.lang = lang
        }
    }
})

export const {
    updateIsLoadingAction,
    updateIsDarkAction,
    updateLangAction
} = commonSlice.actions

export const fetchCommon = (state: any) => state.common;

export default commonSlice.reducer
