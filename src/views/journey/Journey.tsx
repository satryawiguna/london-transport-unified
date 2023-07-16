import PropTypes, {InferProps} from "prop-types";
import {useNavigate} from "react-router-dom";
import {Fragment, useState} from "react";
import {useFetchPlaceByName} from "../../hooks";
import {Combobox, Transition} from '@headlessui/react';
import {BsCheck2, BsChevronExpand} from "react-icons/bs";
import {isEqual} from "lodash";
import {JourneyDto} from "../../types/dto/CommonType";
import {useFormik} from "formik";

const JouneyProps = {
    t: PropTypes.func.isRequired
}

type JourneyPropType = InferProps<typeof JouneyProps>
const Journey = ({t}: JourneyPropType) => {
    const navigate = useNavigate()

    const [selectedStartFrom, setSelectedStarFrom] = useState({})
    const [selectedEndTo, setSelectedEndTo] = useState({})

    const [startFrom, setStartFrom] = useState<string>('')
    const [endTo, setEndTo] = useState<string>('')

    const InitialJourneyFormValues: JourneyDto = {
        startFrom: '',
        endTo: ''
    }

    const journeyForm = useFormik({
        initialValues: InitialJourneyFormValues,
        onSubmit: (values: JourneyDto) => {
            navigate(`/journey/search/?start_from=${values.startFrom}&end_to=${values.endTo}`)
        }
    })

    const {
        refetch: refetchStartFromPlace,
        data: dataStartFromPlace,
        isLoading: isLoadingStartFromPlace,
        isError: isErrorStartFromPlace
    } = useFetchPlaceByName(startFrom)
    const {
        refetch: refetchEndToPlace,
        data: dataEndToPlace,
        isLoading: isLoadingEndToPlace,
        isError: isErrorEndToPlace
    } = useFetchPlaceByName(endTo)

    return (
        <section
            className="bg-center bg-no-repeat bg-[url('./journey-london.jpg')] bg-gray-500 bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl py-56 pb-10">
                <div
                    className="w-full lg:max-w-xl p-6 mb-56 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('text.search_your_journey')}
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={journeyForm.handleSubmit}>
                        <div>
                            <label
                                htmlFor="start_from"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                {t('label.start_from')}
                            </label>
                            {/*<AddressAutofill accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}*/}
                            {/*                 options={{*/}
                            {/*                     country: 'GB',*/}
                            {/*                 }}>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        name="start_from"*/}
                            {/*        autoComplete="address-level1 street-address"*/}
                            {/*        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                            {/*        onChange={(e) => setStartFrom(e.target.value)}*/}
                            {/*        value={startFrom}/>*/}
                            {/*</AddressAutofill>*/}

                            <Combobox value={selectedStartFrom}
                                      onChange={(value: any) => {
                                          setSelectedStarFrom(value)
                                          setStartFrom(value.commonName)
                                          journeyForm.values.startFrom = value.lat + ", " + value.lon
                                      }}>
                                <div className="relative z-20">
                                    <div
                                        className="relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <Combobox.Input
                                            id="start_from"
                                            name="start_from"
                                            className="w-full border-none p-2.5 text-sm leading-5 text-gray-900 dark:text-white focus:ring-0 bg-gray-50 dark:bg-gray-700"
                                            displayValue={(place: any) => place.commonName}
                                            onChange={(event) => {
                                                if (event.target.value.length > 5) {
                                                    setStartFrom(event.target.value)
                                                    refetchStartFromPlace
                                                }
                                            }}
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <BsChevronExpand className="h-5 w-5 text-gray-400"
                                                             aria-hidden="true"/>
                                        </Combobox.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setStartFrom('')}
                                    >
                                        <Combobox.Options
                                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {!isLoadingStartFromPlace && (isErrorStartFromPlace || dataStartFromPlace.length === 0 ? (
                                                <div
                                                    className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                dataStartFromPlace.map((place: any, index: number) => (
                                                    <Combobox.Option
                                                        key={index}
                                                        className={({active}) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active ? 'bg-gray-900 text-white' : 'dark:text-white'
                                                            }`
                                                        }
                                                        value={place}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                    {place.commonName}
                                                                </span>
                                                                {isEqual(selectedStartFrom, place) ? (
                                                                    <span
                                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                            active ? 'text-white' : 'text-teal-600'
                                                                        }`}>
                                                                        <BsCheck2/>
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            ))}
                                        </Combobox.Options>
                                    </Transition>
                                </div>
                            </Combobox>
                            <div className="error-text">
                                {journeyForm.touched.start_from && journeyForm.errors.start_from ? (
                                    <div>{t(journeyForm.errors.start_from)}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="end_to"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                {t('label.end_to')}
                            </label>
                            {/*<AddressAutofill accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}*/}
                            {/*                 options={{*/}
                            {/*                     country: 'GB',*/}
                            {/*                 }}>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        name="end_to"*/}
                            {/*        autoComplete="address-level1 street-address"*/}
                            {/*        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                            {/*        onChange={(e) => setEndTo(e.target.value)}*/}
                            {/*        value={endTo}/>*/}
                            {/*</AddressAutofill>*/}

                            <Combobox value={selectedEndTo}
                                      onChange={(value: any) => {
                                          setSelectedEndTo(value)
                                          setEndTo(value.commonName)
                                          journeyForm.values.endTo = value.lat + ", " + value.lon
                                      }}>
                                <div className="relative z-10">
                                    <div
                                        className="relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <Combobox.Input
                                            id="end_to"
                                            name="end_to"
                                            className="w-full border-none p-2.5 text-sm leading-5 text-gray-900 dark:text-white focus:ring-0 bg-gray-50 dark:bg-gray-700"
                                            displayValue={(place: any) => place.commonName}
                                            onChange={(event) => {
                                                if (event.target.value.length > 5) {
                                                    setEndTo(event.target.value)
                                                    refetchEndToPlace
                                                }
                                            }}
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <BsChevronExpand className="h-5 w-5 text-gray-400"
                                                             aria-hidden="true"/>
                                        </Combobox.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setEndTo('')}
                                    >
                                        <Combobox.Options
                                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {!isLoadingEndToPlace && (isErrorEndToPlace || dataEndToPlace.length === 0 ? (
                                                <div
                                                    className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                dataEndToPlace.map((place: any, index: number) => (
                                                    <Combobox.Option
                                                        key={index}
                                                        className={({active}) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active ? 'bg-gray-900 text-white' : 'dark:text-white'
                                                            }`
                                                        }
                                                        value={place}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                    {place.commonName}
                                                                </span>
                                                                {isEqual(selectedEndTo, place) ? (
                                                                    <span
                                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                            active ? 'text-white' : 'text-teal-600'
                                                                        }`}>
                                                                        <BsCheck2/>
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            ))}
                                        </Combobox.Options>
                                    </Transition>
                                </div>
                            </Combobox>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {t('label.start_journey')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

Journey.propTypes = JouneyProps
export default Journey
