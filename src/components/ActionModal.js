import React from 'react';
import Modal from 'react-modal';

const ActionModal = ({ pickedOption, handleClearPickedOption }) => {
    return (
        <Modal
            appElement={document.querySelector('#root')}
            isOpen={!!pickedOption}
            contentLabel="Selected Option"
            onRequestClose={handleClearPickedOption}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Selected Option</h3>
            <p className="modal__body" data-testid="picked-option">
                {pickedOption}
            </p>
            <button className="button" onClick={handleClearPickedOption}>
                Okay
            </button>
        </Modal>
    );
};

ActionModal.whyDidYouRender = true;

export default React.memo(ActionModal);
