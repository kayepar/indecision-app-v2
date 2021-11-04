import { render, screen, within } from '@testing-library/react';
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

        test('If selected number is changed, number of rows should be reflected in options list', () => {
            const options_container = screen.getByTestId('options-container');

            // should display 5 options since it's the default
            expect(within(options_container).getAllByTestId('option-item')).toHaveLength(5);

            const display5rows = screen.getByRole('button', { name: '5' });

            userEvent.click(display5rows); // this will display select options

            const display10rows = screen.getByRole('option', { name: '10' });

            userEvent.click(display10rows); // change rows to display to 10

            // should display all options
            expect(within(options_container).getAllByTestId('option-item')).toHaveLength(6);
        });
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

        test('If selected number of rows is changed, display on paging should also be updated', () => {
            const display5rows = screen.getByRole('button', { name: '5' });

            userEvent.click(display5rows); // this will display select options

            const display10rows = screen.getByRole('option', { name: '10' });

            userEvent.click(display10rows);

            const pagination = screen.getByTestId('pagination');
            const displayedRows = pagination.querySelectorAll('p')[1].innerHTML;

            expect(displayedRows).toEqual('1-6 of 6');
        });

        test('If last option on page is deleted, display should move to prev page', () => {
            const testOptions = ['Java', 'XML', 'MySQL', 'Jest', 'Firebase'];
            // will make 5 more options --> 11 in total
            testOptions.forEach((option) => addOption(option));

            const pagination = screen.getByTestId('pagination');
            const nextButton = screen.getByRole('button', { name: 'Go to next page' });

            userEvent.click(nextButton); // move to 2nd page
            userEvent.click(nextButton); // move to 3rd page

            expect(pagination.querySelectorAll('p')[1].innerHTML).toEqual('11-11 of 11');

            const options_container = screen.getByTestId('options-container');
            const option_items = within(options_container).getAllByTestId('option-item');

            expect(option_items).toHaveLength(1); // only one option on page 3

            const deleteButton = within(option_items[0]).getByRole('button', { name: 'delete' });

            userEvent.click(deleteButton); // delete the option

            // page 2's options are displayed
            expect(within(options_container).getAllByTestId('option-item')).toHaveLength(5);
            expect(pagination.querySelectorAll('p')[1].innerHTML).toEqual('6-10 of 10');
        });
    });
});
