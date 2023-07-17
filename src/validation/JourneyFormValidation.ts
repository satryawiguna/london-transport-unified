import * as Yup from "yup";

const journeyFormValidationSchema = Yup.object({
    start_from: Yup.string()
        .required('error.start_from_required'),
    end_to: Yup.string()
        .required('error.end_to_required')
})

export default journeyFormValidationSchema
