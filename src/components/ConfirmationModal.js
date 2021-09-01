import React from 'react';
import Modal from 'react-modal';
import { useOptionsContext } from '../context/optionsContext';

Modal.setAppElement('#root');

const ConfirmationModal = (props) => {
    const { optionsDispatch } = useOptionsContext();

    const handleDeleteAll = () => {
        optionsDispatch({ type: 'DELETE_ALL' });
        props.handleClose();
    };

    return (
        <Modal
            isOpen={props.showConfirmation}
            contentLabel="Confirm your request"
            onRequestClose={props.handleClose}
            closeTimeoutMS={200}
            className="modal modal-confirmation"
        >
            <h3 className="modal__title">Confirm your request</h3>
            <p className="modal__body">Do you want to delete all options? This action cannot be undone.</p>
            <button className="button button-dark" onClick={props.handleClose}>
                Cancel
            </button>
            <button className="button" onClick={handleDeleteAll}>
                Delete
            </button>
        </Modal>
    );
};

export default ConfirmationModal;
