import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    userInfo: any,
    accessToken: string,
    isLogged: boolean
}

const initialState: AuthState = {
    userInfo: {},
    accessToken: "",
    isLogged: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction: (state, {payload: {userInfo, accessToken}}: PayloadAction<any>) => {
            state.userInfo = userInfo
            state.accessToken = accessToken
            state.isLogged = true

            return state
        },
        logoutAction: () => initialState,
        updateUserInfoAction: (state, {payload: {userInfo}}: PayloadAction<any>) => {
            state.userInfo = userInfo

            return state
        },
        updateAccessTokenAction: (state, {payload: {accessToken}}: PayloadAction<any>) => {
            state.accessToken = accessToken

            return state
        }
    }
})

export const {
    loginAction,
    logoutAction,
    updateUserInfoAction,
    updateAccessTokenAction
} = authSlice.actions

export const fetchAuth = (state: any) => state.auth;

export default authSlice.reducer
