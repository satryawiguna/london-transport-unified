import PropTypes, {InferProps} from "prop-types";

const SideNavigationProps = {
    t: PropTypes.func.isRequired
}

type SideNavigationPropType = InferProps<typeof SideNavigationProps>
const SideNavigation = ({t}: SideNavigationPropType) => {
    return (
        <>
        </>
    )
}

SideNavigation.propTypes = SideNavigationProps
export default SideNavigation
