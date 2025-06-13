

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Table, Button, Form, Row, Col, Modal, Badge, Spinner
} from 'react-bootstrap';
import {
  Search, Edit, Trash2, User, Mail, Phone, Calendar
} from 'lucide-react';
import {
  deleteContact, setEditingContact, setSearchTerm
} from '../store/contactsSlice';
import { useNavigate } from 'react-router';
import ModalComponent from './modal';
import PaginationComponent from './pagination';

const ContactsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts, searchTerm } = useSelector(state => state.contacts);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const contactsPerPage = 2;

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchTerm(debouncedSearchTerm));
    }, 500);
    return () => clearTimeout(handler);
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    setDebouncedSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = useCallback((contact) => {
    dispatch(setEditingContact(contact));
    navigate("/create-form");
  }, [dispatch, navigate]);

  const confirmDelete = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete.id));
      setShowDeleteModal(false);
      setContactToDelete(null);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const filteredContacts = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return contacts.filter(({ firstName, lastName, email, phone }) =>
      firstName.toLowerCase().includes(lower) ||
      lastName.toLowerCase().includes(lower) ||
      email.toLowerCase().includes(lower) ||
      phone.includes(lower)
    );
  }, [contacts, searchTerm]);

  const currentContacts = useMemo(() => {
    const start = (currentPage - 1) * contactsPerPage;
    return filteredContacts.slice(start, start + contactsPerPage);
  }, [filteredContacts, currentPage]);

  if (!loading) {
    return (
      <div className="loader-style d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <Card className="fade-in">
        <Card.Header className="bg-gradient d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Contacts List</h5>
          <Badge bg="light" text="dark" className="fs-6">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
          </Badge>
        </Card.Header>
        <Card.Body>
          {contacts.length > 0 && (
            <Row className="mb-4">
              <Col md={6}>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Search contacts..."
                    value={debouncedSearchTerm}
                    onChange={handleSearch}
                    className="pe-5"
                  />
                  <Search className="search-icon" size={18} />
                </div>
              </Col>
            </Row>
          )}

          {filteredContacts.length === 0 ? (
            <div className="text-center py-5">
              <User size={48} className="text-muted mb-3" />
              <h5 className="text-muted">No contacts found</h5>
              <p className="text-muted">
                {searchTerm
                  ? 'No contacts match your search criteria.'
                  : 'Start by adding your first contact.'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th><User size={16} className="me-2" />Name</th>
                    <th><Mail size={16} className="me-2" />Email</th>
                    <th><Phone size={16} className="me-2" />Phone</th>
                    <th><Calendar size={16} className="me-2" />Created</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentContacts.map(contact => (
                    <tr key={contact.id} className="fade-in">
                      <td className="fw-bold">{contact.firstName} {contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td><small className="text-muted">{formatDate(contact.createdAt)}</small></td>
                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(contact)}
                            className="d-flex align-items-center gap-1"
                          >
                            <Edit size={14} />
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => confirmDelete(contact)}
                            className="d-flex align-items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <PaginationComponent
                currentPage={currentPage}
                totalPages={Math.ceil(filteredContacts.length / contactsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Card.Body>
      </Card>

      <ModalComponent
        {...{ setShowDeleteModal, showDeleteModal, handleDelete }}
        name={`${contactToDelete?.firstName} ${contactToDelete?.lastName}`}
      />
    </>
  );
};

export default ContactsList;
