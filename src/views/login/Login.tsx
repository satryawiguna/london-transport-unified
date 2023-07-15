import PropTypes, {InferProps} from "prop-types";

const LoginProps = {
    t: PropTypes.func.isRequired
}

type LoginPropType = InferProps<typeof LoginProps>
const Login = ({t}: LoginPropType) => {
    return (
        <></>
    )
}

Login.propTypes = LoginProps
export default Login
