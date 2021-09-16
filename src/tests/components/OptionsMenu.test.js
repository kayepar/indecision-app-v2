import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from 'react-modal';
import OptionsProvider from '../../context/optionsContext';
import IndecisionApp from '../../components/IndecisionApp';
import wait from 'waait';

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

describe('Tests for OptionsMenu component', () => {
    test(`No Options: If menu-icon is clicked, should render the component with 'Delete All' option disabled`, () => {
        const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

        userEvent.click(optionsMenuButton);

        const menu = screen.getByRole('presentation', { id: 'options-menu' });
        const autoDeleteMenuItem = screen.getByRole('menuitem', { name: 'Auto-delete auto-delete-switch' });
        const deleteAllMenuItem = screen.getByRole('menuitem', { name: 'Delete All' });

        expect(menu).toBeInTheDocument();
        expect(autoDeleteMenuItem).toBeInTheDocument();
        expect(deleteAllMenuItem).toBeInTheDocument();
        expect(deleteAllMenuItem).toHaveAttribute('aria-disabled', 'true');
    });

    test(`With Options: If menu-icon is clicked, should render the component with 'Delete All' option enabled`, () => {
        addOption('Node.js');

        const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

        userEvent.click(optionsMenuButton);

        const menu = screen.getByRole('presentation', { id: 'options-menu' });
        const autoDeleteMenuItem = screen.getByRole('menuitem', { name: 'Auto-delete auto-delete-switch' });
        const deleteAllMenuItem = screen.getByRole('menuitem', { name: 'Delete All' });

        expect(menu).toBeInTheDocument();
        expect(autoDeleteMenuItem).toBeInTheDocument();
        expect(deleteAllMenuItem).toBeInTheDocument();
        expect(deleteAllMenuItem).toHaveAttribute('aria-disabled', 'false');
    });

    test('If user clicked anywhere else, should close the menu', () => {
        const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

        userEvent.click(optionsMenuButton);

        const menu = screen.getByRole('presentation', { id: 'options-menu' });
        const overlay = menu.querySelector('div:nth-child(1)');

        userEvent.click(overlay); // click outside of the menu

        const menuContainer = menu.querySelector('div:nth-child(2)');

        expect(menuContainer).toHaveStyle('opacity: 0');
    });

    test(`If 'Delete All' menu-item is clicked, should open confirmation modal`, () => {
        const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

        userEvent.click(optionsMenuButton);

        const deleteAllMenuItem = screen.getByRole('menuitem', { name: 'Delete All' });

        userEvent.click(deleteAllMenuItem);

        const confirmationModal = screen.getByRole('dialog', { name: 'Confirm your request' });

        expect(confirmationModal).toBeInTheDocument();
    });

    // todo: auto-delete should keep value even after closing - rerender?
    // todo: auto-delete
    // todo: clicked button again should hide menu
    // todo: clicking anywhere should hide menu
});
