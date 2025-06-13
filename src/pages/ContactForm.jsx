

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';

import { addContacts, updateContact, setEditingContact } from '../store/contactsSlice';
import MetaTag from '../components/meta';
import { contactValidation } from '../utils/validation';
import FormInput from '../components/formInput';

const ContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { editingContact } = useSelector((state) => state.contacts);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');



  const initialValues = {
    contacts: editingContact
      ? [{
        firstName: editingContact.firstName,
        lastName: editingContact.lastName,
        email: editingContact.email,
        phone: editingContact.phone
      }]
      : [{ firstName: '', lastName: '', email: '', phone: '' }]
  }



  const { handleSubmit, values, setFieldValue, errors, touched, handleChange, handleBlur, resetForm } = useFormik({
    initialValues,
    validationSchema: contactValidation,
    enableReinitialize: true,
    onSubmit: ContactSubmit,
  });


  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };



  function ContactSubmit() {
    if (editingContact) {
      dispatch(updateContact({ ...editingContact, ...values.contacts[0] }));
      showAlertMessage('Contact updated successfully!', 'success');
      dispatch(setEditingContact(null));
      navigate("/dashboard")
    } else {
      dispatch(addContacts(values.contacts));
      showAlertMessage(
        `${values.contacts.length} contact${values.contacts.length > 1 ? 's' : ''} added successfully!`,
        'success'
      );
    }
    resetForm();
  }



  const addMoreFields = () => {
    setFieldValue('contacts', [
      ...values.contacts,
      { firstName: '', lastName: '', email: '', phone: '' }
    ]);
  };


  const removeFields = (index) => {
    const updated = values.contacts.filter((_, i) => i !== index);
    setFieldValue('contacts', updated);
  };


  const cancelEdit = () => {
    dispatch(setEditingContact(null));
    resetForm();
    navigate("/dashboard")
  };

  return (
    <>
      <title>Contact form</title>
      <MetaTag
        keyword="react, contact, management"
        description="This is a contact management app that allows you to add, edit, update, and delete contacts."
      />
      <Card className="mb-4 fade-in ">
        <Card.Header className="bg-gradient">
          <h5 className="mb-0 bold">
            {editingContact ? 'Edit Contact' : 'Add New Contacts'}
          </h5>
        </Card.Header>
        <Card.Body>
          {showAlert && (
            <Alert variant={alertVariant} className="mb-3 " dismissible onClose={() => setShowAlert(false)}>
              {alertMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {values.contacts.map((contact, index) => (
              <div key={index} className="contact-form-group fade-in">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 fw-bold text-decoration-underline text-primary">Contact {index + 1}</h6>
                  {!editingContact && values.contacts.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFields(index)}
                      type="button"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>

                <Row>
                  <Col md={6}>
                    <FormInput
                      lable="First Name"
                      type="text"
                      placeholder="Enter first name"
                      name={`contacts[${index}].firstName`}
                      value={contact.firstName}
                      error={errors.contacts?.[index]?.firstName}
                      isInvalid={!!errors.contacts?.[index]?.firstName && touched.contacts?.[index]?.firstName}

                      {...{ handleChange, handleBlur }}
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput
                      lable="Last Name"
                      type="text"
                      placeholder="Enter last name"
                      name={`contacts[${index}].lastName`}
                      value={contact.lastName}
                      error={errors.contacts?.[index]?.lastName}
                      isInvalid={!!errors.contacts?.[index]?.lastName && touched.contacts?.[index]?.lastName}

                      {...{ handleChange, handleBlur }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormInput
                      lable="Email"
                      type="email"
                      placeholder="Enter email"
                      name={`contacts[${index}].email`}
                      value={contact.email}
                      error={errors.contacts?.[index]?.email}
                      isInvalid={!!errors.contacts?.[index]?.email && touched.contacts?.[index]?.email}

                      {...{ handleChange, handleBlur }}
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput
                      lable="Phone"
                      type="tel"
                      placeholder="Enter phone number"
                      name={`contacts[${index}].phone`}
                      value={contact.phone}
                      error={errors.contacts?.[index]?.phone}
                      isInvalid={!!errors.contacts?.[index]?.phone && touched.contacts?.[index]?.phone}

                      {...{ handleChange, handleBlur }}
                    />
                  </Col>
                </Row>
              </div>
            ))}

            <div className="d-flex gap-2 flex-wrap">
              {!editingContact && (
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={addMoreFields}
                  className="d-flex align-items-center gap-2"
                >
                  <Plus size={16} />
                  Add More Fields
                </Button>
              )}

              <Button
                variant="success"
                type="submit"
                className="d-flex align-items-center gap-2"
              >
                <Save size={16} />
                {editingContact ? 'Update Contact' : values.contacts.length > 1 ? 'Submit All Contacts' : 'Submit Contact'}
              </Button>
              {editingContact && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={cancelEdit}
                  className="d-flex align-items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ContactForm;
