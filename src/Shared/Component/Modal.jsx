import Button from '../FormElement/Button';
import Modal from 'react-bootstrap/Modal';




function CreateModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.title}</h4>
        <p>
          {props.text}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button style="primary" onClick={props.onHide}>Log in</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default CreateModal