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

describe('Tests for OptionsMenu component', () => {
    describe('Opening of menu', () => {
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
    });

    describe('Closing of menu', () => {
        test('If Escape key is clicked, should close the menu', () => {
            const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

            userEvent.click(optionsMenuButton);

            const menu = screen.getByRole('presentation', { id: 'options-menu' });

            expect(menu).toBeInTheDocument();

            userEvent.keyboard('{escape}');

            const menuContainer = menu.querySelector('div:nth-child(2)');

            expect(menuContainer).toHaveStyle('opacity: 0');
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
    });

    describe('Delete All', () => {
        test(`If 'Delete All' menu-item is clicked, should open confirmation modal`, () => {
            const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

            userEvent.click(optionsMenuButton);

            const deleteAllMenuItem = screen.getByRole('menuitem', { name: 'Delete All' });

            userEvent.click(deleteAllMenuItem);

            const confirmationModal = screen.getByRole('dialog', { name: 'Confirm your request' });

            expect(confirmationModal).toBeInTheDocument();
        });
    });

    describe('Auto-delete', () => {
        test('If auto-delete is off, should not automatically delete selected option', () => {
            // start: check that auto-delete is off
            const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

            userEvent.click(optionsMenuButton);

            const menu = screen.getByRole('presentation', { id: 'options-menu' });
            const overlay = menu.querySelector('div:nth-child(1)');
            const autoDeleteMenuItem = menu.querySelectorAll('li > span > span')[0];

            expect(autoDeleteMenuItem).not.toHaveClass('Mui-checked');

            userEvent.click(overlay); // click outside of the menu to close it

            const menuContainer = menu.querySelector('div:nth-child(2)');

            expect(menuContainer).toHaveStyle('opacity: 0'); // menu is closed
            // end: check that auto-delete is off

            // start: pick an option
            const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

            userEvent.click(chooseForMeButton);

            const selectedOptionModal = screen.getByRole('dialog', { name: 'Selected Option' });
            const pickedOption = screen.getByTestId('picked-option');

            expect(selectedOptionModal).toBeInTheDocument();
            expect(pickedOption.textContent).toEqual('Node.js'); // same option from test case #2

            const okayButton = screen.getByRole('button', { name: 'Okay' });

            userEvent.click(okayButton);
            // end: pick an option

            // check that the option still exists
            expect(screen.getByText(/1. Node.js/i)).toBeInTheDocument();
        });

        test('If auto-delete is on, should automatically delete selected option', () => {
            // start: check that auto-delete is on
            const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

            userEvent.click(optionsMenuButton);

            const menu = screen.getByRole('presentation', { id: 'options-menu' });
            const autoDeleteSwitch = screen.getByRole('menuitem', { name: 'Auto-delete auto-delete-switch' });
            const autoDeleteMenuItem = menu.querySelectorAll('li > span > span')[0];

            const overlay = menu.querySelector('div:nth-child(1)');

            userEvent.click(autoDeleteSwitch); // turn switch on

            expect(autoDeleteMenuItem).toHaveClass('Mui-checked');

            userEvent.click(overlay); // click outside of the menu to close it

            const menuContainer = menu.querySelector('div:nth-child(2)');

            expect(menuContainer).toHaveStyle('opacity: 0'); // menu is closed
            // end: check that auto-delete is on

            // start: pick an option
            const chooseForMeButton = screen.getByRole('button', { name: 'Choose for me' });

            userEvent.click(chooseForMeButton);

            const selectedOptionModal = screen.getByRole('dialog', { name: 'Selected Option' });
            const pickedOption = screen.getByTestId('picked-option');

            expect(selectedOptionModal).toBeInTheDocument();
            expect(pickedOption.textContent).toEqual('Node.js'); // same option from test case #2

            const okayButton = screen.getByRole('button', { name: 'Okay' });

            userEvent.click(okayButton);
            // end: pick an option

            // check that the option no longer exists
            expect(screen.queryByText(/1. Node.js/i)).not.toBeInTheDocument();
        });

        test('Should keep previous auto-delete state even after the menu is closed', () => {
            // based on the previous test case, the switch should be turned on

            const optionsMenuButton = screen.getByRole('button', { name: 'options-menu' });

            userEvent.click(optionsMenuButton);

            const menu = screen.getByRole('presentation', { id: 'options-menu' });
            const autoDeleteMenuItem = menu.querySelectorAll('li > span > span')[0];

            expect(autoDeleteMenuItem).toHaveClass('Mui-checked'); // turned on
        });
    });
});
