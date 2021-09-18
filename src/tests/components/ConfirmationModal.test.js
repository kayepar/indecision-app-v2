import { render, screen, waitFor } from '@testing-library/react';
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

describe('Tests for ConfirmationModal component', () => {
    test('Should correctly render the component', () => {
        addOption('Javascript');

        const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

        userEvent.click(optionsMenuButton);

        const deleteAllMenuItem = screen.getByRole('menuitem', { name: 'Delete All' });

        userEvent.click(deleteAllMenuItem);

        expect(screen.getByRole('dialog', { name: 'Confirm your request' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Confirm your request' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });

    test('If cancel button is clicked, should not delete option(s)', async () => {
        const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

        userEvent.click(optionsMenuButton);

        const deleteAllMenuItem = screen.getByRole('menuitem', { name: 'Delete All' });

        userEvent.click(deleteAllMenuItem);

        const confirmationDialog = screen.getByRole('dialog', { name: 'Confirm your request' });
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });

        expect(confirmationDialog).toBeInTheDocument();

        userEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog', { name: 'Confirm your request' })).not.toBeInTheDocument();
        });

        expect(screen.getByText(/1. Javascript/i)).toBeInTheDocument(); // option added from test case 1
    });

    test('If delete button is clicked, should delete option(s)', async () => {
        const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

        userEvent.click(optionsMenuButton);

        const deleteAllMenuItem = screen.getByRole('menuitem', { name: 'Delete All' });

        userEvent.click(deleteAllMenuItem);

        const confirmationDialog = screen.getByRole('dialog', { name: 'Confirm your request' });
        const deleteButton = screen.getByRole('button', { name: 'Delete' });

        expect(confirmationDialog).toBeInTheDocument();

        userEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog', { name: 'Confirm your request' })).not.toBeInTheDocument();
        });

        expect(screen.queryByText(/1. Javascript/i)).not.toBeInTheDocument(); // option added from test case 1
    });

    // todo: add more options
    // todo: should close on escape
    // todo: should close on outside clicks
});
