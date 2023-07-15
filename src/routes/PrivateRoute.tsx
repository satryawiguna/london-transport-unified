import PropTypes, {InferProps} from "prop-types";
import {fetchAuth} from "../store/reducers/authSlice";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from 'react-router-dom';
import AdminLayout from "../components/layouts/AdminLayout";

const PrivateRouteProps = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.any.isRequired
}

type PrivateRoutePropType = InferProps<typeof PrivateRouteProps>
const PrivateRoute = ({t, i18n}: PrivateRoutePropType) => {
    const {isLogged} = useSelector(fetchAuth)

    return isLogged ? (
        <AdminLayout t={t} i18n={i18n}>
            <Outlet/>
        </AdminLayout>

    ) : (
        <Navigate
            to={{
                pathname: '/'
            }}
            replace
        />
    )
}

PrivateRoute.propTypes = PrivateRouteProps
export default PrivateRoute
