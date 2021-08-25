const pickedOptionReducer = (state = undefined, action) => {
    switch (action.type) {
        case 'SET_PICKED_OPTION':
            return action.option;
        default:
            return state;
    }
};

export default pickedOptionReducer;
