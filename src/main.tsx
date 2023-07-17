import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {QueryClient, QueryClientConfig, QueryClientProvider} from "@tanstack/react-query";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store";
import {Provider} from "react-redux";
import {setAuthCredentialTFL} from "./utils/HttpClientTFL";
import {setAuthCredential} from "./utils/HttpClient";
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import './utils/i18Next';
import 'flowbite';
import 'mapbox-gl/dist/mapbox-gl.css';

const config: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
        },
    }
}

const queryClient = new QueryClient(config)

const handleOnBeforeLift = () => {
    if (store.getState().auth.isLogged) {
        setAuthCredential(store.getState().auth.accessToken)
    }

    setAuthCredentialTFL()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={handleOnBeforeLift}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </QueryClientProvider>
        </PersistGate>
    </Provider>
)
