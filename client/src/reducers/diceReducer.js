const diceReducer = (state, action) => {
    switch (action.type) {
        case "GENERATE":
            let newState = {...state}
            newState.value = action.value
            newState.count +=1
            return newState
        default:
            return state
    }
}

export default diceReducer