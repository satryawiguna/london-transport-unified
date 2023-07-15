import './Home.scss'
import PropTypes, {InferProps} from "prop-types";

const HomeProps = {
    t: PropTypes.func.isRequired
}

type HomePropType = InferProps<typeof HomeProps>
const Home = ({t}: HomePropType) => {
    return (
        <></>
    )
}

Home.propTypes = HomeProps
export default Home
