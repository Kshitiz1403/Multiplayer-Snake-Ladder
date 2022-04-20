import React, { useContext, useState } from 'react'
import { DispatchPositionContext } from '../contexts/PositionContext'
import stylesheet from './Dice.module.css'
import { UserContext } from '../contexts/UserContext'
import getDiceSVG from '../utils/getDiceSVG'

const Dice = () => {

    const { dispatchDice } = useContext(DispatchPositionContext)
    const { thisTurnPlayerID, myPlayerNumber } = useContext(UserContext)

    const getDice = () => {
        const value = getValue()
        return value
    }
    const getValue = () => {
        return Math.floor(Math.random() * 6) + 1
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
    const [activeDice, setActiveDice] = useState(getDiceSVG(0))

    return (
        <div className={stylesheet.container}>
            {thisTurnPlayerID != myPlayerNumber ?
                <div>
                    Wait for opponent's turn
                </div>
                :
                <div onClick={rollDice}>
                    <img src={activeDice} width='200px' />
                </div>
            }
        </div>
    )
}

export default Dice