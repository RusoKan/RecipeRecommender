import Button from '../FormElement/Button';
import Modal from 'react-bootstrap/Modal';




function CreateModal(props) {

  return (
    <Modal
    show={props.show}
    onHide={props.onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {props.body}

    </Modal.Body>
    <Modal.Footer>
        
        <Button style="primary" onClick={props.onHide}>Close</Button>
    </Modal.Footer>
</Modal>

  );
}
export default CreateModal