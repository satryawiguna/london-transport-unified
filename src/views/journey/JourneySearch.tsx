import PropTypes, {InferProps} from "prop-types";
import {useSearchParams} from "react-router-dom"
import {JourneyDto} from "../../types/dto/CommonType";
import {useFetchAllJournies} from "../../hooks";
import moment from "moment";
import {Tab} from '@headlessui/react';
import mapboxgl from 'mapbox-gl';
import {Fragment, useState} from "react";
import {swapElements} from "../../helper";

const JourneySearchProps = {
    t: PropTypes.func.isRequired
}

type JourneySearchType = InferProps<typeof JourneySearchProps>
const JourneySearch = ({t}: JourneySearchType) => {
    const [searchParams] = useSearchParams()

    const [selectedTab, setSelectedTab] = useState(0)

    const journey: JourneyDto = {
        startFrom: searchParams.get('start_from'),
        endTo: searchParams.get('end_to')
    }

    const {data: dataJournies, isLoading: isLoadingJournies} = useFetchAllJournies(journey)


    const handleChangeTab = (index) => {
        setSelectedTab(index)

        if (index === 1) {
            if (!isLoadingJournies) {
                const journeys: Array<any> = []

                dataJournies.journeys.map((journey, i) => {
                    journeys[i] = []

                    journey.legs.map((leg, j) => {
                        const lineStrings = JSON.parse(leg.path.lineString)

                        lineStrings.map((lineString, k) => {
                            journeys[i].push(swapElements(lineString, 0, 1))
                        })

                    })
                })

                mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`

                setTimeout(() => {
                    const map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v12',
                        center: [-0.138856, 51.520854],
                        zoom: 12,
                    })

                    map.on('load', () => {
                        journeys.map((journey, index: number) => {
                            console.log(journey)
                            map.addSource(`route-${index}`, {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Feature',
                                    'properties': {},
                                    'geometry': {
                                        'type': 'LineString',
                                        'coordinates': journey
                                    }
                                }
                            })

                            map.addLayer({
                                'id': `route-${index}`,
                                'type': 'line',
                                'source': `route-${index}`,
                                'layout': {
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                },
                                'paint': {
                                    'line-color': `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                                    'line-width': 8
                                }
                            })
                        })

                    })
                }, 1000)
            }
        }

    }

    return (
        <section className="dark:bg-gray-900 dark:text-white">
            <div className="px-4 mx-auto max-w-screen-xl py-24 pb-10">
                <div
                    className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 min-h-screen">
                    <Tab.Group selectedIndex={selectedTab} onChange={handleChangeTab}>
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            <Tab.List className="inline-flex w-full">
                                <Tab as={Fragment}>
                                    {({selected}) => (
                                        <li className="mr-2">
                                            <a href="#"
                                               className={selected ? "inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" : "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"}>
                                                Journey Result
                                            </a>
                                        </li>
                                    )}
                                </Tab>
                                <Tab>
                                    {({selected}) => (
                                        <li className="mr-2">
                                            <a href="#"
                                               className={selected ? "inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" : "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"}>
                                                Leg Information
                                            </a>
                                        </li>
                                    )}

                                </Tab>
                                <Tab>
                                    {({selected}) => (
                                        <li className="mr-2">
                                            <a href="#"
                                               className={selected ? "inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" : "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"}>
                                                Fare Information
                                            </a>
                                        </li>
                                    )}
                                </Tab>
                            </Tab.List>
                        </ul>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="py-10">
                                    {
                                        !isLoadingJournies ?
                                            dataJournies.journeys.map((journey: any, index: number) =>
                                                <div
                                                    id={`accordion-flush-${index}`}
                                                    key={index}
                                                    className="mb-10"
                                                    data-accordion="collapse"
                                                    data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                                    data-inactive-classes="text-gray-500 dark:text-gray-400"
                                                >
                                                    <div
                                                        className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                                        <div className="inline-flex">
                                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                                {t('label.start')}{': '}{moment(journey.startDateTime).format('MMM, Do YYYY')}
                                                                {" - "}
                                                                {t('label.end')}{': '}{moment(journey.endDateTime).format('MMM, Do YYYY')}
                                                            </h5>
                                                        </div>

                                                        <p className="font-normal text-gray-700 dark:text-gray-400">{t('label.total_duration')}{" "}<strong>{journey.duration}</strong>{" "}{t('label.hours')}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            <div className="grid grid-cols-1 gap-4 mb-4 h-screen">
                                                <div
                                                    className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 h-full">
                                                    <div role="status">
                                                        <svg aria-hidden="true"
                                                             className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                             viewBox="0 0 100 101" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="currentColor"/>
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentFill"/>
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="py-10">
                                    <div id='map' className="w-full h-[100vh]"></div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="py-10">
                                    Contact 3
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>

                    </Tab.Group>
                </div>
            </div>
        </section>


    )
}

JourneySearch.propTypes = JourneySearchProps
export default JourneySearch
