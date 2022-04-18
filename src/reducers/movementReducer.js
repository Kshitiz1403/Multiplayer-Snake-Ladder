const movementReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + action.value
        case "DECREMENT":
            return state - action.value
        case "TO":
            return action.value;
        default:
            return state
    }
}

export default movementReducer