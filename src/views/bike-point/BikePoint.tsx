import PropTypes, {InferProps} from "prop-types";
import {useFetchAllBikePoints} from "../../hooks";
import {useEffect} from "react";
import mapboxgl from 'mapbox-gl';

const BikePointProps = {
    t: PropTypes.func.isRequired
}

type BikePointPropType = InferProps<typeof BikePointProps>
const BikePoint = ({t}: BikePointPropType) => {
    const {data: dataBikePoints, isLoading: isLoadingBikePoints} = useFetchAllBikePoints()

    useEffect(() => {
        mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-0.138856, 51.520854],
            zoom: 12,
        })

        if (!isLoadingBikePoints) {
            dataBikePoints.map((dataBikePoint: any, index: number) => {
                const marker = new mapboxgl.Marker({})
                    .setLngLat([dataBikePoint.lon, dataBikePoint.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(`<div style="color: #1F2937;"><h1 style="font-weight: bold;">${dataBikePoint.commonName}</h1><table><tr><td>${t("lable.id")}</td><td>${dataBikePoint.id}</td></tr><tr><td>${t("lable.place_type")}</td><td>${dataBikePoint.placeType}</td></tr></table></div>`))
                    .addTo(map);
            })
        }
    }, []);

    return (
        <section className="dark:bg-gray-900 dark:text-white">
            <div className="px-4 mx-auto max-w-screen-xl py-24 pb-10">
                <div
                    className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 min-h-screen">
                    <div id='map' className="w-full h-[100vh]"></div>
                </div>
            </div>
        </section>
    )
}

BikePoint.propTypes = BikePointProps
export default BikePoint
