import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from 'react-modal';
import IndecisionApp from '../../components/IndecisionApp';

beforeEach(() => {
    const { container } = renderComponent();

    Modal.setAppElement(container);
});

const renderComponent = () => {
    return render(<IndecisionApp />);
};

const addOption = (option) => {
    const { addOptionTextbox, addOptionButton } = getElements();

    userEvent.type(addOptionTextbox, option);
    userEvent.click(addOptionButton);
};

const getElements = () => {
    const addOptionTextbox = screen.getByRole('textbox');
    const addOptionButton = screen.getByRole('button', { name: 'Add Option' });

    return { addOptionTextbox, addOptionButton };
};

describe('Tests for AddForm component', () => {
    describe('Initialization tests', () => {
        test('Should correctly render the AddForm component', () => {
            const { addOptionTextbox, addOptionButton } = getElements();

            expect(addOptionTextbox).toBeInTheDocument();
            expect(addOptionTextbox).toHaveFocus();
            expect(addOptionButton).toBeInTheDocument();
        });

        test('Should be able to type into the input box', () => {
            const optionText = 'React JS';
            const { addOptionTextbox } = getElements();

            userEvent.type(addOptionTextbox, optionText);

            expect(addOptionTextbox.value).toEqual(optionText);
        });
    });

    describe('Valid form submissions', () => {
        test('If input box has text and the button is clicked, should correctly add option', () => {
            const { addOptionTextbox } = getElements();

            addOption('React JS');

            expect(addOptionTextbox.value).toEqual('');
            expect(screen.queryByText(/Enter a valid option/i)).not.toBeInTheDocument();
            expect(screen.getByText(/React JS/i)).toBeInTheDocument();
        });

        test('If valid option is entered after an error, should clear error message and add option', () => {
            const { addOptionTextbox, addOptionButton } = getElements();

            userEvent.click(addOptionButton); // invalid

            expect(screen.getByText(/Enter a valid option/i)).toBeInTheDocument();

            addOption('HTML5'); // valid option

            expect(addOptionTextbox.value).toBe('');
            expect(screen.queryByText(/Enter a valid option/i)).not.toBeInTheDocument();
            expect(screen.getByText(/HTML5/i)).toBeInTheDocument();
        });

        test('Should submit form on enter key', () => {
            const { addOptionTextbox } = getElements();

            userEvent.type(addOptionTextbox, 'JAVA{enter}');

            expect(addOptionTextbox.value).toBe('');
            expect(screen.queryByText(/Enter a valid option/i)).not.toBeInTheDocument();
            expect(screen.getByText(/JAVA/i)).toBeInTheDocument();
        });
    });

    describe('Invalid form submissions', () => {
        test('If input box is empty and the button is clicked, should show error message', () => {
            userEvent.click(screen.getByRole('button', { name: 'Add Option' }));

            expect(screen.getByText(/Enter a valid option/i)).toBeInTheDocument();
        });

        test('If option already exists, should display error message', () => {
            const optionText = 'React JS';
            const { addOptionTextbox } = getElements();

            addOption(optionText);

            expect(addOptionTextbox.value).toEqual(optionText);
            expect(screen.getByText(/This option already exists/i)).toBeInTheDocument();
            expect(screen.getAllByText(new RegExp(optionText, 'i'))).toHaveLength(1);
        });
    });
});
