import React, { useContext, useState } from 'react'
import { DispatchPositionContext, PositionContext } from '../contexts/PositionContext'
import stylesheet from './Dice.module.css'
import { UserContext } from '../contexts/UserContext'
import getDiceSVG from '../utils/getDiceSVG'
import { generateDiceValue } from '../utils/generateDiceValue'

const Dice = () => {

    const { dice, receivedDice } = useContext(PositionContext)
    const { dispatchDice } = useContext(DispatchPositionContext)
    const { thisTurnPlayerID, myPlayerNumber, enemyPlayerNumber, myPlayerName, enemyPlayerName } = useContext(UserContext)

    const rollDice = async () => {
        const dice = generateDiceValue()
        const shuffle = setInterval(() => {
            setActiveDice(getDiceSVG(generateDiceValue()))
        }, 50);
        setTimeout(() => {
            clearInterval(shuffle)
            setActiveDice(getDiceSVG(dice))
            dispatchDice({ type: "GENERATE", value: dice })
            return
        }, 500);
    }
    const [activeDice, setActiveDice] = useState(getDiceSVG(0))

    return (
        <div className={stylesheet.container}>
            <div className={stylesheet.box}>
                <div className={stylesheet.boxItem}>
                    <div className={stylesheet.circle} style={{ background: "red" }}></div>
                    <div>{myPlayerNumber == 1 ? myPlayerName : enemyPlayerName}</div>
                </div>
                <div className={stylesheet.boxItem}>
                    <div className={stylesheet.circle} style={{ background: "blue" }}></div>
                    <div>{myPlayerNumber == 2 ? myPlayerName : enemyPlayerName}</div>
                </div>
            </div>
            {thisTurnPlayerID != myPlayerNumber ?
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                    <div>
                        {dice.value !== 0 ? `You rolled ${dice.value}` : null}
                    </div>
                    <div>
                        Wait for opponent's turn
                    </div>
                </div>
                :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: "white" }}>
                    <div onClick={rollDice}>
                        <img src={activeDice} width='75px' />
                    </div>
                    <div>{receivedDice !== 0 ? <div>Opponent rolled {receivedDice}</div> : null}</div>
                </div>
            }
        </div>
    )
}

export default Dice