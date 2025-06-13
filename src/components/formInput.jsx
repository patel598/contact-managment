import { Form } from 'react-bootstrap'

const FormInput = ({ lable, type, name, value, placeholder, handleChange, handleBlur, error, isInvalid }) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>{lable}</Form.Label>
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    isInvalid={isInvalid}
                    onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </Form.Group>

        </>
    )
}

export default FormInput