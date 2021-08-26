import React, { useContext } from 'react';
import Modal from 'react-modal';
import PickedOptionContext from '../context/pickedOptionContext';

Modal.setAppElement('#root');

const OptionModal = () => {
    const { pickedOption, pickedOptionDispatch } = useContext(PickedOptionContext);

    const handleCloseModal = () => {
        pickedOptionDispatch({ type: 'CLEAR_PICKED_OPTION' });
    };

    return (
        <Modal
            isOpen={!!pickedOption}
            contentLabel="Selected Option"
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Selected Option</h3>
            <p className="modal__body">{pickedOption}</p>
            <button className="button" onClick={handleCloseModal}>
                Okay
            </button>
        </Modal>
    );
};

export default OptionModal;
