import * as Yup from 'yup';



export const contactValidation = Yup.object({
    contacts: Yup.array().of(
        Yup.object().shape({
            firstName: Yup.string().matches(/^[A-Za-z\s]+$/, 'First name must contain only letters').required('First name is required'),
            lastName: Yup.string().matches(/^[A-Za-z\s]+$/, 'First name must contain only letters').required('Last name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string()
                .matches(/^[\+]?[\d\s\-\(\)]{10,}$/, 'Invalid phone number')
                .required('Phone is required')
        })
    )
})