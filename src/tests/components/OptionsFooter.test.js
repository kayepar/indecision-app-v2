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
    });

    describe('Tests for paging', () => {
        test('If options are more than 5, should display paging', () => {
            const prevButton = screen.getByRole('button', { name: 'Go to previous page' });
            const nextButton = screen.getByRole('button', { name: 'Go to next page' });

            expect(prevButton).toBeInTheDocument();
            expect(nextButton).toBeInTheDocument();

            // check the text for the pages
        });
    });

    // todo: fix rowsperppage error
    // paging - not showing if options not greater than 5
    // should be hidden if option falls less than 5 --> delete some
    // should display more options if selected rows is 10 or 20
    // should display next set of options if arrow forward is clicked
    // addOption in a loop
});
