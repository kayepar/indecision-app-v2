const paginationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return { ...state, page: action.page };

        case 'SET_DISPLAY':
            return { ...state, display: action.display };
        default:
            throw new Error('Cannot handle action');
    }
};

export default paginationReducer;
