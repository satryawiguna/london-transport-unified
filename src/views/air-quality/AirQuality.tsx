import PropTypes, {InferProps} from "prop-types";
import {useFetchAirQualities} from "../../hooks";
import {generateTagTranslation, htmlDecode} from "../../helper";

const AirQualityProps = {
    t: PropTypes.func.isRequired
}

type AirQualityPropType = InferProps<typeof AirQualityProps>
const AirQuality = ({t}: AirQualityPropType) => {
    const {data: dataAirQualities, isLoading: isLoadingAirQualities} = useFetchAirQualities()

    const handleIndicator = (status: string) => {
        let indicator: unknown

        switch (status) {
            case "Low":
                indicator = "inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                break

            case "Medium":
                indicator = "inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                break

            case "High":
                indicator = "inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                break
        }

        return indicator
    }

    return (
        <section className="dark:bg-gray-900 dark:text-white">
            <div className="px-4 mx-auto max-w-screen-xl py-24 pb-10">
                <div
                    className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 min-h-screen">
                    {
                        !isLoadingAirQualities ? (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {
                                    dataAirQualities.currentForecast.map((item, index) => (
                                        <div key={index}
                                             className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
                                            <h2 className="text-xl font-bold">{t('label.forecast')}{" "}{t(generateTagTranslation(item.forecastType, 'label'))}</h2>
                                            <div>
                                                <table
                                                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead
                                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            {t('label.indicator')}
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            {t('label.result')}
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {t('label.forecast_band')}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={handleIndicator(item.forecastBand)}>
                                                                {item.forecastBand}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {t('label.forecast_summary')}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item.forecastSummary}
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {t('label.n_o2_band')}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={handleIndicator(item.nO2Band)}>
                                                                {item.nO2Band}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {t('label.o3_band')}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={handleIndicator(item.o3Band)}>
                                                                {item.o3Band}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {t('label.pm_10_band')}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={handleIndicator(item.pM10Band)}>
                                                                {item.pM10Band}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {t('label.pm_25_band')}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={handleIndicator(item.pM25Band)}>
                                                                {item.pM25Band}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {t('label.s_o2_band')}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={handleIndicator(item.sO2Band)}>
                                                                {item.sO2Band}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <div className="mt-10"
                                                     dangerouslySetInnerHTML={{__html: htmlDecode(item.forecastText)}}></div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div role="status"
                                     className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status"
                                     className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div
                                                className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div
                                                className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </section>
    )
}

AirQuality.propTypes = AirQualityProps
export default AirQuality
