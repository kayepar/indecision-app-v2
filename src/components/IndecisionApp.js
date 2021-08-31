import React from 'react';
import Header from './Header';
import ActionButton from './ActionButton';
import PickedOptionProvider from '../context/pickedOptionContext';
import ActionModal from './ActionModal';
import Options from './Options';
import AddForm from './AddForm';

const IndecisionApp = () => {
    return (
        <>
            <Header />
            <PickedOptionProvider>
                <div className="container container--content">
                    <ActionButton />
                    <Options />
                    <ActionModal />
                    <AddForm />
                </div>
            </PickedOptionProvider>
        </>
    );
};

// todo: wire delete all --> add a confirmation first
// todo: make delete button an icon
// todo: nice to have -> auto-scroll
// todo: add tests

export default IndecisionApp;
