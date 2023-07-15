import PropTypes, {InferProps} from "prop-types";
import TopNavigation from "../TopNavigation";

const CommonLayoutProps = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.any.isRequired,
    children: PropTypes.node
}

type CommonLayoutPropType = InferProps<typeof CommonLayoutProps>
const CommonLayout = ({t, i18n, children}: CommonLayoutPropType) => {
    return (
        <>
            <TopNavigation t={t} i18n={i18n}/>
            <main>{children}</main>
        </>
    )
}

CommonLayout.propTypes = CommonLayoutProps
export default CommonLayout
