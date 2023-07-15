import PropTypes, {InferProps} from "prop-types";

const JouneyProps = {
    t: PropTypes.func.isRequired
}

type JourneyPropType = InferProps<typeof JouneyProps>
const Journey = ({t}: JourneyPropType) => {
    return (
        <>
            Journey Page
        </>
    )
}

Journey.propTypes = JouneyProps
export default Journey
