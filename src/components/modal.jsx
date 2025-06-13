import { Button, Modal } from "react-bootstrap"

const ModalComponent = ({setShowDeleteModal, showDeleteModal, name, handleDelete}) => {
  return (
     <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the contact{' '}
          <strong>
           {name} 
          </strong>
          ? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Contact
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalComponent