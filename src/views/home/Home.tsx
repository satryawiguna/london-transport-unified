import './Home.scss'
import PropTypes, {InferProps} from "prop-types";
import {Link} from "react-router-dom";

const HomeProps = {
    t: PropTypes.func.isRequired
}

type HomePropType = InferProps<typeof HomeProps>
const Home = ({t}: HomePropType) => {
    return (
        <>
            <section
                className="bg-center bg-no-repeat bg-[url('./bus-london.jpeg')] bg-gray-500 bg-blend-multiply">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-56 pb-10">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">{t('text.journey_with_tfl_keep_getting_brighter')}</h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">{t('text.findout_more_about_the_improvements_we_re_making_now_and_in_furture')}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link to={'/journey'}
                              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            {t('label.start_journey')}
                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                        <Link to={'/about'}
                              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                            {t("label.more_information")}
                        </Link>
                    </div>
                </div>
                <div className="pb-56">
                    <iframe className="mx-auto w-full lg:w-[50%] h-72 rounded-lg sm:h-96 shadow-xl"
                            src="https://www.youtube.com/embed/Qmq4SZUxqQY" title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                </div>
            </section>
        </>
    )
}

Home.propTypes = HomeProps
export default Home
