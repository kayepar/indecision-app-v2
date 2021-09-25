import React from 'react';
import Modal from 'react-modal';

const ActionModal = ({ optionsDispatch, pickedOption, updatePickedOption, autoDelete, autoDeleteDispatch }) => {
    const handleCloseModal = () => {
        if (autoDelete) optionsDispatch({ type: 'DELETE_OPTION', option: pickedOption });

        updatePickedOption(undefined);
    };

    return (
        <Modal
            appElement={document.querySelector('#root')}
            isOpen={!!pickedOption}
            contentLabel="Selected Option"
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Selected Option</h3>
            <p className="modal__body" data-testid="picked-option">
                {pickedOption}
            </p>
            <button className="button" onClick={handleCloseModal}>
                Okay
            </button>
        </Modal>
    );
};

export default ActionModal;
