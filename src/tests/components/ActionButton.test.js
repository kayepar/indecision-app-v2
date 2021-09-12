import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from 'react-modal';
import OptionsProvider from '../../context/optionsContext';
import IndecisionApp from '../../components/IndecisionApp';

beforeEach(() => {
    const { container } = renderComponent();
    Modal.setAppElement(container);
});

const renderComponent = () => {
    return render(
        <OptionsProvider>
            <IndecisionApp />
        </OptionsProvider>
    );
};

const addOption = (option) => {
    userEvent.type(screen.getByRole('textbox'), option);
    userEvent.click(screen.getByRole('button', { name: 'Add Option' }));
};

describe('Tests for ActionButton', () => {
    test('Should correctly render the component', () => {
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        expect(chooseForMeButton).toBeInTheDocument();
    });

    test('If there are no options, should render the button as disabled', () => {
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        expect(chooseForMeButton).toBeDisabled();
    });

    test('If option is available, should render the button as enabled', () => {
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        addOption('Javascript');

        expect(chooseForMeButton).toBeEnabled();
    });

    test('If button is clicked, should open modal dialog', () => {
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        addOption('HTML5');

        userEvent.click(chooseForMeButton);

        const selectedOptionModal = screen.getByRole('dialog', { name: 'Selected Option' });

        expect(selectedOptionModal).toBeInTheDocument();
    });
});
