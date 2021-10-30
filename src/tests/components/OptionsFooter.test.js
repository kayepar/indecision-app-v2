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

    describe('Tests for rows per page dropdown', () => {
        test('If options are less than 5, should display dropdown', () => {
            const pagination = screen.queryByTestId('pagination');

            expect(pagination).not.toBeInTheDocument();
        });

        test('If options are more than 5, should display dropdown', () => {
            const testOptions = ['CSS', 'HTML5', 'React.js', 'Node.js', 'MongoDB'];

            testOptions.forEach((option) => addOption(option));

            const pagination = screen.queryByTestId('pagination');
            const display5rows = within(pagination).getByRole('button', { name: '5' });

            expect(pagination).toBeInTheDocument();

            // within(pagination).getByRole('');

            expect(display5rows).toBeInTheDocument();
        });

        test('Dropdown should show 5, 10, and 20 as options', () => {
            const pagination = screen.getByTestId('pagination');
            const display5rows = within(pagination).getByRole('button', { name: '5' });

            expect(pagination).toBeInTheDocument();

            userEvent.click(display5rows);

            screen.debug(undefined, 20000);

            // find popup and form within, check the options

            // within(pagination).getByRole('');

            // expect(display5rows).toBeInTheDocument();
        });
    });
    // rows per page - not displayed if options not greater than 5 --> -> should have 5, 10, 20 as options
    // paging - not showing if options not greater than 5
    // should be hidden if option falls less than 5 --> delete some
    // should display more options if selected rows is 10 or 20
    // should display next set of options if arrow forward is clicked
    // should display
    // addOption in a loop
});
