import React, { useState } from 'react'
import dice0 from './assets/dice.svg'
import dice1 from './assets/dice-one.svg'
import dice2 from './assets/dice-two.svg'
import dice3 from './assets/dice-three.svg'
import dice4 from './assets/dice-four.svg'
import dice5 from './assets/dice-five.svg'
import dice6 from './assets/dice-six.svg'

const Dice = () => {

    const getDice = () => {
        return Math.floor(Math.random() * 6) + 1
    }
    const rollDice = () => {
        const dice = getDice()
        if (dice == 1) setActiveDice(dice1)
        else if (dice == 2) setActiveDice(dice2)
        else if (dice == 3) setActiveDice(dice3)
        else if (dice == 4) setActiveDice(dice4)
        else if (dice == 5) setActiveDice(dice5)
        else if (dice == 6) setActiveDice(dice6)
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