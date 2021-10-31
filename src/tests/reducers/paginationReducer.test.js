import paginationReducer from '../../reducers/paginationReducer';

describe('Tests for paginationReducer', () => {
    test('Should setup default state values', () => {
        const state = paginationReducer(undefined, { type: '@@INIT' });

        expect(state).toEqual({
            page: 0,
            rowsPerPage: 5,
        });
    });

    test('If page is passed in, should correctly override value in state', () => {
        const testState = {
            page: 0,
            rowsPerPage: 5,
        };

        const state = paginationReducer(testState, { type: 'SET_PAGE', page: 3 });

        expect(state).toEqual({
            page: 3,
            rowsPerPage: 5,
        });
    });

    test('If rowsPerPage is passed in, should correctly override value in state', () => {
        const testState = {
            page: 0,
            rowsPerPage: 5,
        };

        const state = paginationReducer(testState, { type: 'SET_ROWS_PER_PAGE', rowsPerPage: 20 });

        expect(state).toEqual({
            page: 0,
            rowsPerPage: 20,
        });
    });
});
