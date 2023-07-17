import PropTypes, {InferProps} from "prop-types";
import {useSearchParams} from "react-router-dom"
import {JourneyDto} from "../../types/dto/CommonType";
import {useFetchAllJournies} from "../../hooks";
import moment from "moment";
import {useEffect} from "react";
import {AccordionItem, AccordionOptions} from "flowbite";

const JourneySearchProps = {
    t: PropTypes.func.isRequired
}

type JourneySearchType = InferProps<typeof JourneySearchProps>
const JourneySearch = ({t}: JourneySearchType) => {
    const [searchParams] = useSearchParams()

    const journey: JourneyDto = {
        startFrom: searchParams.get('start_from'),
        endTo: searchParams.get('end_to')
    }

    const {data: dataJournies, isLoading: isLoadingJournies} = useFetchAllJournies(journey)


    useEffect(() => {
        const accordionItems: Array<AccordionItem> = []
        const options: AccordionOptions = {
            alwaysOpen: true,
            activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
            inactiveClasses: 'text-gray-500 dark:text-gray-400'
        }

        if (!isLoadingJournies) {
            dataJournies.journeys.map((journey: any, index: number) => {
                accordionItems.push({
                    id: `accordion-example-heading-1${index}`,
                    triggerEl: document.querySelector(`#accordion-example-heading-1${index}`),
                    targetEl: document.querySelector(`#accordion-example-body-1${index}`),
                    active: false
                })
            })
            console.log(accordionItems)
            // new Accordion(accordionItems, options)
        }
    }, [])


    return (
        <section className="dark:bg-gray-900 dark:text-white">
            <div className="px-4 mx-auto max-w-screen-xl py-24 pb-10">
                <div
                    className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 min-h-screen">
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

                                    <h2 id={`accordion-flush-heading-1${index}`}>
                                        <button
                                            type="button"
                                            className="flex px-6 items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                                            data-accordion-target={`#accordion-flush-body-1${index}`}
                                            aria-expanded="false"
                                            aria-controls={`accordion-flush-body-1${index}`}
                                        >
                                            <span>{t('label.leg_information')}</span>
                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h2>
                                    <div
                                        id={`accordion-flush-body-1${index}`}
                                        className="hidden"
                                        aria-labelledby={`accordion-flush-heading-1${index}`}
                                    >
                                        <div className="py-5 px-6 border-b border-gray-200 dark:border-gray-700">
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                Coming soon...
                                            </p>
                                        </div>
                                    </div>
                                    <h2 id={`accordion-flush-heading-2${index}`}>
                                        <button
                                            type="button"
                                            className="flex px-6 items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                                            data-accordion-target={`#accordion-flush-body-2${index}`}
                                            aria-expanded="false"
                                            aria-controls={`accordion-flush-body-2${index}`}
                                        >
                                            <span>{t('label.fare_information')}</span>
                                            <svg
                                                data-accordion-icon=""
                                                className="w-3 h-3 rotate-180 shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5 5 1 1 5"
                                                />
                                            </svg>
                                        </button>
                                    </h2>
                                    <div
                                        id={`accordion-flush-body-2${index}`}
                                        className="hidden"
                                        aria-labelledby={`accordion-flush-heading-2${index}`}
                                    >
                                        <div className="py-5 px-6 border-b border-gray-200 dark:border-gray-700">
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                Coming soon...
                                            </p>
                                        </div>
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
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </div>
        </section>


    )
}

JourneySearch.propTypes = JourneySearchProps
export default JourneySearch
