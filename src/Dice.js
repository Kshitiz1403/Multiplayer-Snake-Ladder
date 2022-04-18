import React, { useContext, useState } from 'react'
import dice0 from './assets/dice/dice.svg'
import dice1 from './assets/dice/dice-one.svg'
import dice2 from './assets/dice/dice-two.svg'
import dice3 from './assets/dice/dice-three.svg'
import dice4 from './assets/dice/dice-four.svg'
import dice5 from './assets/dice/dice-five.svg'
import dice6 from './assets/dice/dice-six.svg'
import { PositionContext } from './contexts/PositionContext'

const Dice = () => {

    const { dispatchDice } = useContext(PositionContext)

    const getDice = () => {
        const value = getValue()
        dispatchDice({ type: "ADD", value })
        return value
    }
    const getValue = () => {
        return Math.floor(Math.random() * 6) + 1
    }
    const getDiceSVG = (diceNumber) => {
        if (diceNumber === 1) return (dice1)
        if (diceNumber === 2) return (dice2)
        if (diceNumber === 3) return (dice3)
        if (diceNumber === 4) return (dice4)
        if (diceNumber === 5) return (dice5)
        if (diceNumber === 6) return (dice6)
    }
    const rollDice = async () => {
        const dice = getDice()
        const shuffle = setInterval(() => {
            setActiveDice(getDiceSVG(getValue()))
        }, 50);
        setTimeout(() => {
            clearInterval(shuffle)
            setActiveDice(getDiceSVG(dice))
            return
        }, 500);
    }
    const [activeDice, setActiveDice] = useState(dice0)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div onClick={rollDice}>
                <img src={activeDice} width='200px' />
            </div>
        </div>
    )
}

export default Dice