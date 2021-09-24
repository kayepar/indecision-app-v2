const autoDeleteReducer = (state = false, action) => {
    switch (action.type) {
        case 'GET_VALUE':
            console.log('reducer state: ' + state);
            return state;
        case 'SET_VALUE':
            return action.value;
        default:
            return state;
    }
};

export default autoDeleteReducer;
