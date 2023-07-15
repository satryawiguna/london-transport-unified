import PropTypes, {InferProps} from "prop-types";
import {useSelector} from "react-redux";
import {fetchAuth} from "../store/reducers/authSlice";
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import CommonLayout from "../components/layouts/CommonLayout";

const PublicRouteProps = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.any.isRequired
}

type PublicRoutePropType = InferProps<typeof PublicRouteProps>
const PublicRoute = ({t, i18n}: PublicRoutePropType) => {
    const {isLogged} = useSelector(fetchAuth)
    const location = useLocation()

    return !isLogged && location.pathname !== '/login' && location.pathname !== '/register' ? (
        <CommonLayout t={t} i18n={i18n}>
            <Outlet/>
        </CommonLayout>
    ) : (
        <Navigate
            to={{
                pathname: '/admin/dashboard'
            }}
            replace
        />
    )
}

PublicRoute.propTypes = PublicRouteProps
export default PublicRoute
