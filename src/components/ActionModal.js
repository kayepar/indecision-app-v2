import React from 'react';
import Modal from 'react-modal';
import { useOptionsContext } from '../context/optionsContext';
import useLocalStorage from '../hooks/useLocalStorage';

Modal.setAppElement('#root');

const ActionModal = (props) => {
    const [autoDelete] = useLocalStorage('autoDelete');
    const { optionsDispatch } = useOptionsContext();

    const handleCloseModal = () => {
        if (autoDelete) optionsDispatch({ type: 'DELETE_OPTION', option: props.pickedOption });

        props.updatePickedOption(undefined);
    };

    return (
        <Modal
            isOpen={!!props.pickedOption}
            contentLabel="Selected Option"
            onRequestClose={handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">Selected Option</h3>
            <p className="modal__body">{props.pickedOption}</p>
            <button className="button" onClick={handleCloseModal}>
                Okay
            </button>
        </Modal>
    );
};

export default ActionModal;
