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
import { socket } from '../App'
import { paintGame } from '../paintGame'

const Player = () => {
    const { squareDimension } = useContext(LayoutContext)
    const { dice, myCoordinates, enemyCoordinates } = useContext(PositionContext)
    const { dispatchMyCoordinates, dispatchEnemyCoordinates, changeEnemyCoordinates, changeMyCoordinates } = useContext(DispatchPositionContext)
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

    const Character = ({ playerImg }) => (
        <div className={stylesheet.character} style={{ width: squareDimension, height: squareDimension, padding: squareDimension * 0.4 }}>
            <img src={playerImg} />
        </div>
    )

    useEffect(() => {
        const { location, diceValue, horizontal, vertical } = paintGame({ location: myCoordinates.location, diceValue: dice.value, snakes, laders, horizontal: myCoordinates.horizontal, vertical: myCoordinates.vertical })

        socket.emit('send-update', myCoordinates.location, diceValue)

        changeMyCoordinates({ location, diceValue, horizontal, vertical })

    }, [dice])

    useEffect(() => {
        const receiveHandler = ({ location, dice }) => {
            let paintData = paintGame({ location, diceValue: dice, snakes, laders, horizontal: enemyCoordinates.horizontal, vertical: enemyCoordinates.vertical })
            changeEnemyCoordinates({ location: paintData.location, diceValue: paintData.diceValue, horizontal: paintData.horizontal, vertical: paintData.vertical })
        }
        socket.on('receive-update', receiveHandler);

        return () => socket.off('receive-update', receiveHandler)
    }, [socket])


    useEffect(() => {
        if (myCoordinates.location == 99) won()
        
    }, [myCoordinates])

    useEffect(() => {
        if (enemyCoordinates.location == 99) won()
    }, [enemyCoordinates])

    return (
        <div>

            <div className={stylesheet.container} style={{ bottom: squareDimension * myCoordinates.vertical, left: squareDimension * myCoordinates.horizontal }}>
                <Character playerImg={getPlayerSVG(1)} />
            </div>
            <div className={stylesheet.container} style={{ bottom: squareDimension * enemyCoordinates.vertical, left: squareDimension * enemyCoordinates.horizontal }}>
                <Character playerImg={getPlayerSVG(2)} />
            </div>
        </div>
    )
}

export default Player