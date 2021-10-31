const defaultState = {
    page: 0,
    rowsPerPage: 5,
};

const paginationReducer = (state = defaultState, action) => {
    // console.log(state);

    switch (action.type) {
        case 'SET_PAGE':
            console.log(state);
            return { ...state, page: action.page };

        case 'SET_ROWS_PER_PAGE':
            return { ...state, rowsPerPage: action.rowsPerPage };
        default:
            // throw new Error('Cannot handle action');
            return defaultState;
    }
};

export default paginationReducer;
