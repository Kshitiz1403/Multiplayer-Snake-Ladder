import React, { useContext, useState } from 'react'
import dice0 from '../assets/dice/dice.svg'
import dice1 from '../assets/dice/dice-one.svg'
import dice2 from '../assets/dice/dice-two.svg'
import dice3 from '../assets/dice/dice-three.svg'
import dice4 from '../assets/dice/dice-four.svg'
import dice5 from '../assets/dice/dice-five.svg'
import dice6 from '../assets/dice/dice-six.svg'
import { DispatchPositionContext } from '../contexts/PositionContext'
import stylesheet from './Dice.module.css'

const Dice = () => {

    const { dispatchDice } = useContext(DispatchPositionContext)

    const getDice = () => {
        const value = getValue()
        return value
    }
    const getValue = () => {
        return Math.floor(Math.random() * 6) + 1
    }
    const getDiceSVG = (diceNumber) => {
        switch (diceNumber) {
            case 0: return dice0
            case 1: return dice1
            case 2: return dice2
            case 3: return dice3
            case 4: return dice4
            case 5: return dice5
            case 6: return dice6
        }
    }
    const rollDice = async () => {
        const dice = getDice()
        const shuffle = setInterval(() => {
            setActiveDice(getDiceSVG(getValue()))
        }, 50);
        setTimeout(() => {
            clearInterval(shuffle)
            setActiveDice(getDiceSVG(dice))
            dispatchDice({ type: "ADD", value: dice })
            return
        }, 500);
    }
    const [activeDice, setActiveDice] = useState(dice0)

    return (
        <div className={stylesheet.container}>
            <div onClick={rollDice}>
                <img src={activeDice} width='200px' />
            </div>
        </div>
    )
}

export default Dice