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

describe('Tests for Option component', () => {
    test('Should correctly render the component', () => {
        const optionText = 'Javascript';

        addOption(optionText);

        const option = screen.getByTestId('option-item');
        const deleteButton = within(option).getByRole('button', { name: 'delete' });

        expect(option.textContent).toEqual(`1. ${optionText}`);
        expect(deleteButton).toBeInTheDocument();
    });

    test('If delete icon is clicked, should remove option', () => {
        const optionText = 'Node.js';

        addOption(optionText);

        const options = screen.getAllByTestId('option-item');

        expect(options).toHaveLength(2);
        expect(options[1].textContent).toEqual(`2. ${optionText}`);

        const deleteButton = within(options[1]).getByRole('button', { name: 'delete' });

        userEvent.click(deleteButton);

        expect(screen.getAllByTestId('option-item')).toHaveLength(1);
        expect(options[0].textContent).not.toEqual(`2. ${optionText}`);
    });
});
