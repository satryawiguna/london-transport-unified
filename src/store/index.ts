import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import commonReducer from "./reducers/commonSlice";
import authReducer from "./reducers/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    common: commonReducer
})

const persistConfig = {
    key: "KEY",
    storage,
    whiteList: [],
    blackList: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.MODE !== "production",
    middleware: [thunk]
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
