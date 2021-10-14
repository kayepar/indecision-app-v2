import React, { memo } from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#root');

const ConfirmationModal = ({ optionsDispatch, showConfirmation, handleClose }) => {
    const handleDeleteAll = () => {
        optionsDispatch({ type: 'DELETE_ALL' });
        handleClose();
    };

    return (
        <Modal
            appElement={document.querySelector('#root')}
            isOpen={showConfirmation}
            contentLabel="Confirm your request"
            onRequestClose={handleClose}
            closeTimeoutMS={200}
            className="modal modal-confirmation"
        >
            <h3 className="modal__title">Confirm your request</h3>
            <p className="modal__body">Do you want to delete all options? This action cannot be undone.</p>
            <button className="button button-dark" onClick={handleClose}>
                Cancel
            </button>
            <button className="button" onClick={handleDeleteAll}>
                Delete
            </button>
        </Modal>
    );
};

export default memo(ConfirmationModal);
