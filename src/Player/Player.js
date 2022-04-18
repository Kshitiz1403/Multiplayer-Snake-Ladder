import React, { useContext, useEffect, useState } from 'react'
import player1 from '../assets/player/mummy-head.svg'
import player2 from '../assets/player/cleopatra.svg'
import player3 from '../assets/player/monk-face.svg'
import player4 from '../assets/player/goblin-head.svg'
import player5 from '../assets/player/female-vampire.svg'
import { LayoutContext } from '../contexts/LayoutContext'
import { DispatchPositionContext, PositionContext } from '../contexts/PositionContext'
import { laders, snakes } from '../config'
import { VictoryContext } from '../contexts/VictoryContext'
import { UserContext } from '../contexts/UserContext'
import stylesheet from './Player.module.css'

const Player = () => {
    const { squareDimension } = useContext(LayoutContext)
    const { dice, coordinates } = useContext(PositionContext)
    const { dispatchCoordinates } = useContext(DispatchPositionContext)
    const { won } = useContext(VictoryContext)
    const { myPlayerID } = useContext(UserContext)

    const getPlayerSVG = (playerID) => {
        switch (playerID) {
            case 1:
                return player1
            case 2:
                return player2
        }
    }

    const Character = () => (
        <div className={stylesheet.character} style={{ width: squareDimension, height: squareDimension, padding: squareDimension * 0.4 }}>
            <img src={getPlayerSVG(myPlayerID)} />
        </div>
    )

    useEffect(() => {
        dispatchCoordinates({ diceValue: dice.value, snakes, laders })
    }, [dice])

    useEffect(() => {
        if (coordinates.location == 99) won()
    }, [coordinates])


    return (
        <div className={stylesheet.container} style={{ bottom: squareDimension * coordinates.vertical, left: squareDimension * coordinates.horizontal }}>
            <Character />
        </div>
    )
}

export default Player