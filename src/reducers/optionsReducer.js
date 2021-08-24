const optionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_OPTIONS':
            return state;
        case 'ADD_OPTION':
            return [...state, action.text];
        case 'DELETE_OPTION':
            return state.filter((option) => option.text !== action.text);
        default:
            return state;
    }
};

export default optionsReducer;
