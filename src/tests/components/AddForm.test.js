import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddForm from '../../components/AddForm';
import OptionsProvider from '../../context/optionsContext';

afterEach(cleanup);

const renderComponents = () => {
    return render(
        <OptionsProvider>
            <AddForm />
        </OptionsProvider>
    );
};

const addOptions = (options) => {
    options.forEach((option) => {
        addOption(option);
    });
};

const addOption = (option) => {
    const { inputElement, buttonElement } = getElements();

    userEvent.type(inputElement, option);
    userEvent.click(buttonElement);
};

const getElements = () => {
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    return { inputElement, buttonElement };
};

describe('Tests for AddForm component', () => {
    describe('Initialization tests', () => {
        test('Should correctly render the AddForm component', () => {
            const { asFragment } = renderComponents();

            expect(asFragment()).toMatchSnapshot();
        });

        test('On load, should have focus on the input box', () => {
            const { getByRole } = renderComponents();
            const inputElement = getByRole('textbox');

            expect(inputElement).toHaveFocus();
        });

        test('Should be able to type into the input box', () => {
            const { getByRole } = renderComponents();
            const inputElement = getByRole('textbox');
            const optionText = 'React JS';

            userEvent.type(inputElement, optionText);

            expect(inputElement.value).toEqual(optionText);
        });
    });

    describe('Valid form submissions', () => {
        test('If input box has text and the button is clicked, should not show error message', () => {
            const { queryByText } = renderComponents();
            const { inputElement } = getElements();

            addOption('React JS');

            expect(inputElement.value).toEqual('');
            expect(queryByText(/Enter a valid option/i)).not.toBeInTheDocument();
        });

        test('If valid option is entered after an error, should clear error message', async () => {
            const { queryByText } = renderComponents();
            const { inputElement } = getElements();

            addOption(' '); // invalid option

            const errorElement = queryByText(/Enter a valid option/i);

            expect(errorElement).toBeInTheDocument();

            addOption('HTML 5'); // valid option

            expect(inputElement.value).toBe('');
            expect(errorElement).not.toBeInTheDocument();
        });

        test('If multiple unique options are added, should not show error message', () => {
            const options = ['React JS', 'Node JS', 'CSS'];
            const { queryByText } = renderComponents();

            addOptions(options);

            const errorElement = queryByText(/This option already exists/i);

            expect(errorElement).not.toBeInTheDocument();
        });

        test('Should submit form on enter key', () => {
            const { queryByText } = renderComponents();
            const { inputElement } = getElements();

            userEvent.type(inputElement, 'JAVA{enter}');

            const errorElement = queryByText(/Enter a valid option/i);

            expect(inputElement.value).toBe('');
            expect(errorElement).not.toBeInTheDocument();
        });
    });

    describe('Invalid form submissions', () => {
        test('If input box is empty and the button is clicked, should show error message', () => {
            const { getByText, getByRole } = renderComponents();

            userEvent.click(getByRole('button'));

            const errorElement = getByText(/Enter a valid option/i);

            expect(errorElement).toBeVisible();
        });

        test('If option already exist, should show error message', () => {
            const options = ['Javascript', 'Javascript'];
            const { queryByText } = renderComponents();

            addOptions(options);

            const errorElement = queryByText(/This option already exists \(#1\)/i);

            expect(errorElement).toBeInTheDocument();
        });

        test('If option already exist, text should remain in the input box', () => {
            const options = ['React JS', 'React JS'];
            const { queryByText } = renderComponents();
            addOptions(options);

            const { inputElement } = getElements();
            const errorElement = queryByText(/This option already exists/i);

            expect(errorElement).toBeInTheDocument();
            expect(inputElement.value).toBe(options[0]);
        });
    });
});
