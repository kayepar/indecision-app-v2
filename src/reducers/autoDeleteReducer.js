const autoDeleteReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            return action.value;
        default:
            return state;
    }
};

export default autoDeleteReducer;
