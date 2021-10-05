import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from 'react-modal';
import IndecisionApp from '../../components/IndecisionApp';

beforeEach(() => {
    const { container } = renderComponent();

    Modal.setAppElement(container);
});

const renderComponent = () => {
    return render(
            <IndecisionApp />
    );
};

const addOption = (option) => {
    userEvent.type(screen.getByRole('textbox'), option);
    userEvent.click(screen.getByRole('button', { name: 'Add Option' }));
};

describe('Tests for ActionModal component', () => {
    test(`If 'Choose for me' button is not clicked, should not render the component`, () => {
        const selectedOptionModal = screen.queryByRole('dialog', { name: 'Selected Option' });

        expect(selectedOptionModal).not.toBeInTheDocument();
    });

    test(`If 'Choose for me' button is clicked, should render the component`, () => {
        const optionText = 'Node.js';
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        addOption(optionText);

        userEvent.click(chooseForMeButton);

        const selectedOptionModal = screen.getByRole('dialog', { name: 'Selected Option' });
        const pickedOption = screen.getByTestId('picked-option');

        expect(selectedOptionModal).toBeInTheDocument();
        expect(pickedOption.textContent).toEqual(optionText);
    });

    test('If Okay button is clicked, should close the modal dialog', async () => {
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        userEvent.click(chooseForMeButton);

        const selectedOptionModal = screen.getByRole('dialog', { name: 'Selected Option' });

        expect(selectedOptionModal).toBeInTheDocument();

        const okayButton = screen.getByRole('button', { name: 'Okay' });

        userEvent.click(okayButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog', { name: 'Selected Option' })).not.toBeInTheDocument();
        });
    });

    test('If Escape key is clicked, should close the modal dialog', async () => {
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        userEvent.click(chooseForMeButton);

        const selectedOptionModal = screen.getByRole('dialog', { name: 'Selected Option' });

        expect(selectedOptionModal).toBeInTheDocument();

        userEvent.keyboard('{escape}');

        await waitFor(() => {
            expect(screen.queryByRole('dialog', { name: 'Selected Option' })).not.toBeInTheDocument();
        });
    });

    test('If user clicked anywhere else, should close the modal dialog', async () => {
        const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

        userEvent.click(chooseForMeButton);

        const selectedOptionModal = screen.getByRole('dialog', { name: 'Selected Option' });

        expect(selectedOptionModal).toBeInTheDocument();

        const modalOverlay = document.querySelector('.ReactModal__Overlay');

        userEvent.click(modalOverlay); // click anywhere

        await waitFor(() => {
            expect(screen.queryByRole('dialog', { name: 'Selected Option' })).not.toBeInTheDocument();
        });
    });
});
