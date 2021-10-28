const paginationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return { ...state, page: action.page };

        case 'SET_ROWS_PER_PAGE':
            return { ...state, rowsPerPage: action.rows };
        default:
            throw new Error('Cannot handle action');
    }
};

export default paginationReducer;
