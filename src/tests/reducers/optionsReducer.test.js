import optionsReducer from '../../reducers/optionsReducer';

describe('Tests for optionsReducer', () => {
    const testOptions = ['KFC', `McDonald's`, `Popeye's`, 'Jollibee'];

    describe('Initial state test', () => {
        test('Should setup default options state value', () => {
            const state = optionsReducer(undefined, { type: '@@INIT' });

            expect(state).toEqual([]);
        });
    });

    describe('Load options tests', () => {
        test('Default state value: If options are passed in, should correctly set the options array in state', () => {
            const state = optionsReducer(undefined, { type: 'LOAD_OPTIONS', options: testOptions });

            expect(state).toEqual(testOptions);
        });

        test('Custom state value: If options are passed in, should correctly overwrite options array in state', () => {
            const state = optionsReducer(['one', 'two', 'three'], { type: 'LOAD_OPTIONS', options: testOptions });

            expect(state).toEqual(testOptions);
        });
    });

    describe('Add option test', () => {
        test('If an option is added, should correctly append to options array', () => {
            const testOption = 'Burger King';

            const state = optionsReducer(testOptions, { type: 'ADD_OPTION', option: testOption });

            expect(state).toEqual([...testOptions, testOption]);
        });
    });

    describe('Delete option by text (description) tests', () => {
        test('If an option is existing, should reflect deletion in the array', () => {
            const remainingOptions = ['KFC', `McDonald's`, 'Jollibee'];
            const testOption = `Popeye's`;

            const state = optionsReducer(testOptions, { type: 'DELETE_OPTION', option: testOption });

            expect(state).toEqual(remainingOptions);
        });

        test('If an option is not existing, should not have any effect on the array', () => {
            const testOption = `Denny's`;

            const state = optionsReducer(testOptions, { type: 'DELETE_OPTION', option: testOption });

            expect(state).toEqual(testOptions);
        });
    });

    describe('Delete all options test', () => {
        test('Should reset state to an empty array', () => {
            const state = optionsReducer(testOptions, { type: 'DELETE_ALL' });

            expect(state).toEqual([]);
        });
    });
});
