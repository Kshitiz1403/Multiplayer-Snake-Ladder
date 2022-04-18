const diceReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return action.value
        default:
            return state
    }
}

export default diceReducer