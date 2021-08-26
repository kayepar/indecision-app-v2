const pickedOptionReducer = (state = undefined, action) => {
    switch (action.type) {
        case 'SET_PICKED_OPTION':
            return action.option;
        case 'CLEAR_PICKED_OPTION':
            return undefined;
        default:
            return state;
    }
};

export default pickedOptionReducer;
