import PropTypes, {InferProps} from "prop-types";
import {useSelector} from "react-redux";
import {fetchAuth} from "../store/reducers/authSlice";
import {Link, useLocation} from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const TopNavigationProps = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.any.isRequired
}

type TopNavigationPropType = InferProps<typeof TopNavigationProps>
const TopNavigation = ({t, i18n}: TopNavigationPropType) => {
    const {isLogged} = useSelector(fetchAuth)
    const location = useLocation()
    const attributes = {}

    return (
        <nav className="top-navigation">
            <div className="wrapper">
                <a href="#">
                    <img
                        src="/logo-icon.svg"
                        alt="TFL"
                    />
                    <span className="title">
                        <span className="sub-title">
                            TFL
                        </span>
                        Website
                    </span>
                </a>

                <div className="flex md:order-2">
                    <LanguageSelector t={t} i18n={i18n}/>
                    <button data-collapse-toggle="navbar-sticky" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>


                {/*Top menu desktop device*/}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to={'/'}
                                className={location.pathname === '/' ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" :
                                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
                            >
                                {t('menu.home')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/journey'}
                                className={location.pathname === '/start-journey' ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" :
                                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
                            >
                                {t('menu.start_journey')}
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={location.pathname === '/about' ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" :
                                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
                            >
                                {t('menu.about')}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={location.pathname === '/contact' ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" :
                                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
                            >
                                {t('menu.contact')}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

TopNavigation.propTypes = TopNavigationProps

export default TopNavigation
