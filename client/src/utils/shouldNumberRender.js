const shouldNumberRender = (myLocation, enemyLocation, squareLocation) => {
    let boolean = true;

    if (myLocation + 1 === squareLocation) {
        boolean = false
    }
    if (enemyLocation + 1 === squareLocation) {
        boolean = false
    }
    return boolean
}

export default shouldNumberRender