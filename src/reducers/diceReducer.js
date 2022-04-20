const diceReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            let prevState = {...state}
            prevState.value = action.value
            prevState.count +=1
            return prevState
        default:
            return state
    }
}

export default diceReducer