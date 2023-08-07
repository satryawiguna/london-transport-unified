import './App.css'
import useSWR, {mutate} from "swr";
import {useCallback, useState} from "react";

const App = () => {
    const [number, setNumber] = useState<number>(0)

    const yourFetcher = () => fetch().then((res) => res.text())
    const {data, error} = useSWR("http://your-service-domain.com/", yourFetcher)

    const doRefresh = () => {
        mutate("http://your-service-domain.com/")
    }

    const handleChange = useCallback((e) => {
        setNumber(e.target.value)
    }, [number])

    if (error)
        return <div>{error.message}</div>

    if (!data)
        return <div>Loading...</div>

    return (
        <>
            <input value={number} className="p-2 " onChange={handleChange}/>
            <button
                onClick={doRefresh}>
                Refresh
            </button>
            {data}
        </>
    )
}

export default App
