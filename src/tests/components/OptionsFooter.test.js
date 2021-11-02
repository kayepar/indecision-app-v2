import { render, screen, within, waitFor } from '@testing-library/react';
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
    userEvent.type(screen.getByRole('textbox'), option);
    userEvent.click(screen.getByRole('button', { name: 'Add Option' }));
};

describe('Tests for the OptionsFooter component', () => {
    describe('Tests for the total/tally details', () => {
        test('If there are no options yet, should not render total', () => {
            const totalElement = screen.queryByTestId('total-options');

            expect(totalElement).not.toBeInTheDocument();
        });

        test('If there is an option, should correctly render in singular form', () => {
            addOption('Javascript');

            const totalElement = screen.getByTestId('total-options');

            expect(totalElement).toBeInTheDocument();
            expect(totalElement).toHaveTextContent('1 option');
        });

        test('If there are more options, should correctly display in plural form', () => {
            addOption('HTML5');

            const totalElement = screen.getByTestId('total-options');

            expect(totalElement).toBeInTheDocument();
            expect(totalElement).toHaveTextContent('2 options');
        });

        test('If an option is deleted, should correctly decrement total', () => {
            const options = screen.getAllByTestId('option-item');

            const deleteButton = within(options[1]).getByRole('button', { name: 'delete' });

            userEvent.click(deleteButton);

            const totalElement = screen.getByTestId('total-options');

            expect(totalElement).toBeInTheDocument();
            expect(totalElement).toHaveTextContent('1 option');
        });
    });

    describe('Test for pagination component', () => {
        test('If options are less than 5, should not display dropdown', () => {
            const display5rows = screen.queryByRole('button', { name: '5' });

            expect(display5rows).not.toBeInTheDocument();
        });

        test('If options are less than 5, should not display paging', () => {
            const prevButton = screen.queryByRole('button', { name: 'Go to previous page' });
            const nextButton = screen.queryByRole('button', { name: 'Go to next page' });

            expect(prevButton).not.toBeInTheDocument();
            expect(nextButton).not.toBeInTheDocument();
        });
    });

    describe('Tests for rows per page dropdown', () => {
        test('If options are more than 5, should display dropdown', () => {
            const testOptions = ['CSS', 'HTML5', 'React.js', 'Node.js', 'MongoDB'];

            // will make 5 more options --> 6 in total
            testOptions.forEach((option) => addOption(option));

            const display5rows = screen.getByRole('button', { name: '5' });

            expect(display5rows).toBeInTheDocument();
        });

        test('Dropdown should show 5, 10, and 20 as options', () => {
            const display5rows = screen.getByRole('button', { name: '5' });

            userEvent.click(display5rows);

            expect(screen.getByRole('option', { name: '5' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: '10' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: '20' })).toBeInTheDocument();
        });

        // Change to 10, all should be displayed - count options...

        // test('If selected number is changed, number of rows should be reflected in options list', () => {
        //     const display5rows = screen.getByRole('button', { name: '5' });

        //     userEvent.click(display5rows);

        //     const display10rows = screen.getByRole('option', { name: '10' });

        //     // userEvent.selectOptions(display10rows);

        //     userEvent.selectOptions(
        //         // Find the select element
        //         screen.getByRole('option'),
        //         // Find and select the Ireland option
        //         // screen.getByRole('option', { name: '10' })
        //         display10rows
        //     );

        //     // screen.debug(undefined, 20000);
        // });
    });

    describe('Tests for paging', () => {
        test('If options are more than 5, should display paging', () => {
            const prevButton = screen.getByRole('button', { name: 'Go to previous page' });
            const nextButton = screen.getByRole('button', { name: 'Go to next page' });

            expect(prevButton).toBeInTheDocument();
            expect(nextButton).toBeInTheDocument();

            const pagination = screen.getByTestId('pagination');
            const displayedRows = pagination.querySelectorAll('p')[1].innerHTML;

            expect(displayedRows).toEqual('1-5 of 6');
        });

        test('If next button is clicked, should display options on second page', () => {
            const nextButton = screen.getByRole('button', { name: 'Go to next page' });

            userEvent.click(nextButton);

            const pagination = screen.getByTestId('pagination');
            const displayedRows = pagination.querySelectorAll('p')[1].innerHTML;

            expect(displayedRows).toEqual('6-6 of 6');

            const options_container = screen.getByTestId('options-container');
            const option_items = within(options_container).getAllByTestId('option-item');

            // should only display the sixth option
            expect(option_items).toHaveLength(1);
        });

        test('If previous button is clicked, should display options on first page', async () => {
            // screen.getByRole('');
            const nextButton = screen.getByRole('button', { name: 'Go to next page' });
            userEvent.click(nextButton);

            const prevButton = screen.getByRole('button', { name: 'Go to previous page' });
            userEvent.click(prevButton);

            const pagination = screen.getByTestId('pagination');
            const displayedRows = pagination.querySelectorAll('p')[1].innerHTML;

            expect(displayedRows).toEqual('1-5 of 6');

            const options_container = screen.getByTestId('options-container');
            const option_items = within(options_container).getAllByTestId('option-item');

            // should display 5 options again
            expect(option_items).toHaveLength(5);
        });
    });

    // should be hidden if option falls less than 5 --> delete some
    // should display more options if selected rows is 10 or 20
});
