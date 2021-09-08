import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButton from '../../components/ActionButton';
import OptionsProvider from '../../context/optionsContext';
import AddForm from '../../components/AddForm';

afterEach(cleanup);

const updatePickedOptionSpy = jest.fn();

const renderComponents = () => {
    return render(
        <OptionsProvider>
            <ActionButton updatePickedOption={updatePickedOptionSpy} />
            <AddForm />
        </OptionsProvider>
    );
};

const addOption = (option) => {
    userEvent.type(screen.getByRole('textbox'), option);
    userEvent.click(screen.getByRole('button', { name: 'Add Option' }));
};

describe('Tests for ActionButton', () => {
    test('Should correctly render the component', () => {
        const { asFragment } = renderComponents();

        expect(asFragment()).toMatchSnapshot();
    });

    test('If there are no options, should render the button as disabled', () => {
        const { getByRole } = renderComponents();
        const chooseForMeButton = getByRole('button', { name: 'Choose for me' });

        expect(chooseForMeButton).toBeDisabled();
    });

    test('If option is available, should render the button as enabled', () => {
        const { getByRole } = renderComponents();
        const chooseForMeButton = getByRole('button', { name: 'Choose for me' });

        addOption('Javascript');

        expect(chooseForMeButton).toBeEnabled();
    });

    test('If button is clicked, should call updatePickedOption prop function', () => {
        const { getByRole } = renderComponents();
        const chooseForMeButton = getByRole('button', { name: 'Choose for me' });

        addOption('HTML5');
        userEvent.click(chooseForMeButton);

        expect(updatePickedOptionSpy).toBeCalledWith('HTML5');
    });
});
