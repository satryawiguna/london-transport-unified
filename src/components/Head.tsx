import {Helmet} from "react-helmet";
import PropTypes, {InferProps} from "prop-types";
import {useSelector} from "react-redux";
import {fetchCommon} from "../store/reducers/commonSlice";

const HeadProps = {
    t: PropTypes.func.isRequired
}

type HeadPropType = InferProps<typeof HeadProps>
const Head = ({t}: HeadPropType) => {
    const {title, description} = useSelector(fetchCommon);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title}/>
            <meta name="description" content={description}/>
            <meta name="og:title" content={title}/>
            <meta name="og:description" content={description}/>
            <link rel="icon" type="image/x-icon" href="src/components/Head"/>
        </Helmet>
    )
}

Head.propTypes = HeadProps
export default Head
