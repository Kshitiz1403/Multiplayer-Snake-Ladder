export const paintGame = ({ location, diceValue, snakes, laders, horizontal, vertical }) => {
    let newLocation


    if (diceValue + location + 1 > 100) {
        return { location, diceValue, horizontal, vertical }
    }

    let boolean = false
    for (const snake of snakes) {
        if (diceValue + location + 1 == snake.from) {
            newLocation = snake.to - 1
            boolean = true
            break
        }
    }
    for (const lader of laders) {
        if (diceValue + location + 1 == lader.from) {
            newLocation = lader.to - 1
            boolean = true
            break
        }
    }
    if (boolean) {

    } else {
        newLocation = location + diceValue
    }
    vertical = Math.floor(newLocation / 10)
    if (vertical % 2 == 1) horizontal = 9 - newLocation % 10
    else horizontal = newLocation % 10

    return { location: newLocation, diceValue, horizontal, vertical }
}