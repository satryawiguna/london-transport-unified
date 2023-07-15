import PropTypes, {InferProps} from "prop-types";
import TopNavigation from "../TopNavigation";
import SideNavigation from "../SideNavigation";

const AdminLayoutProps = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.any.isRequired,
    children: PropTypes.node
}

type AdminLayoutPropType = InferProps<typeof AdminLayoutProps>
const AdminLayout = ({t, i18n, children}: AdminLayoutPropType) => {
    return (
        <>
            <TopNavigation t={t} i18n={i18n}/>
            <SideNavigation t={t}/>
            <main>{children}</main>
        </>
    )
}

AdminLayout.propTypes = AdminLayoutProps
export default AdminLayout
