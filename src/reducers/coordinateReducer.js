const coordinateReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE":
            return { horizontal: action.payload.horizontal, vertical: action.payload.vertical }
        case "HORIZONTAL":
            return { horizontal: action.value, vertical: state.vertical }
        case "VERTICAL":
            return { horizontal: state.horizontal, vertical: action.value }
        default:
            return state
    }
}

export default coordinateReducer;