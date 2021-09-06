import React, { useState } from 'react';
import Header from './Header';
import ActionButton from './ActionButton';
import ActionModal from './ActionModal';
import Options from './Options';
import AddForm from './AddForm';

const IndecisionApp = () => {
    const [pickedOption, setPickedOption] = useState(undefined);

    const updatePickedOption = (option) => {
        setPickedOption(option);
    };

    return (
        <>
            <Header />
            <div className="container container--content">
                <ActionButton updatePickedOption={updatePickedOption} />
                <Options />
                <AddForm />
            </div>
            <ActionModal pickedOption={pickedOption} updatePickedOption={updatePickedOption} />
        </>
    );
};

export default IndecisionApp;
