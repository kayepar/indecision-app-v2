import pickedOptionReducer from '../../reducers/pickedOptionReducer';

describe('Tests for PickedOptionReducer', () => {
    describe('Initial state test', () => {
        test('Should setup default pickedOption state value', () => {
            const state = pickedOptionReducer(undefined, { type: '@@INIT' });

            expect(state).toEqual(undefined);
        });
    });

    describe('Set option tests', () => {
        test('Default state value: If an option is selected, should correctly set value in state', () => {
            const testOption = 'Test option';

            const state = pickedOptionReducer(undefined, { type: 'SET_PICKED_OPTION', option: testOption });

            expect(state).toEqual(testOption);
        });

        test('Custom state value: If an option is selected, should correctly overwrite value in state', () => {
            const testOption = 'Study';

            const state = pickedOptionReducer('Work out', { type: 'SET_PICKED_OPTION', option: testOption });

            expect(state).toEqual(testOption);
        });
    });

    describe('Clear option test', () => {
        test('Should set state to default value', () => {
            const state = pickedOptionReducer('Cook food', { type: 'CLEAR_PICKED_OPTION' });

            expect(state).toEqual(undefined);
        });
    });
});
