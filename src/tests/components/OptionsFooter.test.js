import { ExploreOff } from '@mui/icons-material';
import { render, screen, waitFor } from '@testing-library/react';
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
        test('Should not render the total if there are no options', () => {
            const totalElement = screen.queryByTestId('total-options');

            expect(totalElement).not.toBeInTheDocument();
        });

        test('Should correctly render if there is an option', () => {
            addOption('Javascript');

            const totalElement = screen.getByTestId('total-options');

            expect(totalElement).toBeInTheDocument();
            expect(totalElement).toHaveTextContent('1 option');
        });

        test('Should correctly display in plural form if more than one option', () => {
            addOption('HTML5');

            const totalElement = screen.getByTestId('total-options');

            expect(totalElement).toBeInTheDocument();
            expect(totalElement).toHaveTextContent('2 options');
        });
    });

    // should decrement if option is deleted
    // rows per page - not displayed if options not greater than 5
    // paging - not showing if options not greater than 5 -> should have 5, 10, 20 as options
    // should be hidden if option falls less than 5 --> delete some
    // should display more options if selected rows is 10 or 20
    // should display next set of options if arrow forward is clicked
    // should display
    // addOption in a loop
});
