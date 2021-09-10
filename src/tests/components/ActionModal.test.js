import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionModal from '../../components/ActionModal';
import OptionsProvider from '../../context/optionsContext';

afterEach(cleanup);

const renderComponents = (props) => {
    return render(
        <OptionsProvider>
            <ActionModal {...props} />
        </OptionsProvider>
    );
};

describe('Tests for ActionModal component', () => {
    test('Should correctly render the component if an option is selected', () => {
        const props = { pickedOption: 'CSS', updatePickedOption: jest.fn() };
        const { getByRole } = renderComponents(props);
        const modalElement = getByRole('dialog', { name: 'Selected Option' });

        expect(modalElement).toBeInTheDocument();
    });

    test('Should not render the component if no option is selected', () => {
        const props = { pickedOption: undefined, updatePickedOption: jest.fn() };
        const { queryByRole } = renderComponents(props);
        const modalElement = queryByRole('dialog', { name: 'Selected Option' });

        expect(modalElement).not.toBeInTheDocument();
    });

    test('If Okay button is clicked, should clear pickedOption', () => {
        const props = { pickedOption: 'HTML5', updatePickedOption: jest.fn() };
        const { getByRole } = renderComponents(props);
        const buttonElement = getByRole('button', { name: 'Okay' });

        userEvent.click(buttonElement);

        expect(props.updatePickedOption).toBeCalledWith(undefined);
    });

    // todo: Complete workflow with form and choose for me button
    // todo: autodelete?
});
