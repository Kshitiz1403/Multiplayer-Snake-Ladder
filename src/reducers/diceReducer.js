const diceReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            let prevState = {...state}
            prevState.value = action.value
            prevState.temp +=1
            return prevState
        default:
            return state
    }
}

export default diceReducer