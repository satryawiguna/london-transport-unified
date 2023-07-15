import {useSelector} from "react-redux";
import {fetchCommon} from "./store/reducers/commonSlice";
import {useEffect, useRef} from "react";
import LoadingBar, {LoadingBarRef} from "react-top-loading-bar";
import {useTranslation} from "react-i18next";
import {Navigate, Route, Routes} from "react-router-dom";
import Head from "./components/Head";
import PublicRoute from "./routes/PublicRoute";
import Home from "./views/home/Home";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./views/404";
import Journey from "./views/journey/Journey";

const App = () => {
    const {isLoading, lang} = useSelector(fetchCommon)

    const inputRef = useRef<LoadingBarRef>(null)
    const {t, i18n} = useTranslation()

    useEffect(() => {
        if (isLoading) {
            inputRef.current?.continuousStart()
        } else {
            inputRef.current?.complete()
        }

    }, [isLoading])

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, []);

    return (
        <>
            <Head t={t}/>
            <LoadingBar color='#f11946' ref={inputRef}/>
            <Routes>
                <Route element={<PublicRoute t={t} i18n={i18n}/>}>
                    <Route path="/" element={<Home t={t}/>}/>
                    <Route path="/journey" element={<Journey t={t}/>}/>
                    <Route path="/*" element={<Navigate to={'/404'}/>}/>
                    <Route path="/404" element={<NotFound t={t}/>}/>
                </Route>
                <Route element={<PrivateRoute t={t} i18n={i18n}/>}>
                </Route>
            </Routes>
        </>
    )
}

export default App
