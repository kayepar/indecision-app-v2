import React from 'react';
import Header from './Header';
import ActionButton from './ActionButton';
import OptionsProvider from '../context/optionsContext';
import PickedOptionProvider from '../context/pickedOptionContext';
import ActionModal from './ActionModal';

const IndecisionApp = () => {
    return (
        <OptionsProvider>
            <Header />
            <PickedOptionProvider>
                <div className="container container--content">
                    <div>
                        <ActionButton />
                    </div>
                    <ActionModal />
                </div>
            </PickedOptionProvider>
        </OptionsProvider>
    );
};

export default IndecisionApp;
