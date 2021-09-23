import { render, screen, within } from '@testing-library/react';
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

describe('Tests for Options component', () => {
    test(`If there are no options, should display basic component with 'Get started' message`, () => {
        const optionsHeader = screen.getByText(/Your Options/i);
        const message = screen.getByText(/Please add an option to get started/i);
        const optionsMenu = screen.getByRole('button', { name: 'options-menu' });

        expect(optionsHeader).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(optionsMenu).toBeInTheDocument();
    });

    test('Should be able to display single option', () => {
        addOption('Javascript');

        const message = screen.queryByText(/Please add an option to get started/i);

        expect(message).not.toBeInTheDocument();

        const options_container = screen.getByTestId('options-container');
        const option_items = within(options_container).getAllByTestId('option-item');

        expect(option_items).toHaveLength(1);
    });

    test('Should be able to display multiple options', () => {
        addOption('React.js');

        const options_container = screen.getByTestId('options-container');
        const option_items = within(options_container).getAllByTestId('option-item');

        expect(option_items).toHaveLength(2);
    });

    // todo: Notes: scrollbar appearing after 3 options and auto-scroll are better tested in E2E
});