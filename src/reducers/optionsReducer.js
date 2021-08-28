const optionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_OPTIONS':
            return action.options;
        case 'ADD_OPTION':
            return [...state, action.option];
        case 'DELETE_OPTION':
            return state.filter((option) => option !== action.option);
        case 'DELETE_ALL':
            return [];
        default:
            return state;
    }
};

export default optionsReducer;
