import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import mummy_head from '../assets/player/mummy-head.svg'
import cleopatra from '../assets/player/cleopatra.svg'
import monkey_face from '../assets/player/monk-face.svg'
import goblin_head from '../assets/player/goblin-head.svg'
import female_vampire from '../assets/player/female-vampire.svg'
import { LayoutContext } from '../contexts/LayoutContext'
import { DispatchPositionContext, PositionContext } from '../contexts/PositionContext'
import { laders, snakes } from '../config'
import { VictoryContext } from '../contexts/VictoryContext'
import { switchThisTurnPlayerID, UserContext } from '../contexts/UserContext'
import stylesheet from './Player.module.css'
import { socket } from '../App'
import { paintGame } from '../paintGame'

const Player = () => {
    const { squareDimension } = useContext(LayoutContext)
    const { dice, myCoordinates, enemyCoordinates } = useContext(PositionContext)
    const { changeEnemyCoordinates, changeMyCoordinates } = useContext(DispatchPositionContext)
    const { won } = useContext(VictoryContext)
    const { myPlayerNumber, enemyPlayerNumber, thisTurnPlayerID, setThisTurnPlayerID } = useContext(UserContext)

    const getPlayerSVG = (playerNumber) => {
        switch (playerNumber) {
            case 1:
                return monkey_face
            case 2:
                return female_vampire
        }
    }

    const Character = ({ playerImg }) => (
        <div className={stylesheet.character} style={{ width: squareDimension, height: squareDimension, padding: squareDimension * 0.4 }}>
            <img src={playerImg} />
        </div>
    )

    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) mounted.current = true
        else{
            const { location, diceValue, horizontal, vertical } = paintGame({ location: myCoordinates.location, diceValue: dice.value, snakes, laders, horizontal: myCoordinates.horizontal, vertical: myCoordinates.vertical })

            const switchedID = switchThisTurnPlayerID(thisTurnPlayerID)

            socket.emit('send-update', myCoordinates.location, diceValue, switchedID)
            setThisTurnPlayerID(switchedID)

            changeMyCoordinates({ location, diceValue, horizontal, vertical })
        }

    }, [dice])

    useEffect(() => {

        console.log(`I am player ${myPlayerNumber}`)
    }, [myPlayerNumber])


    useEffect(() => {
        const receiveHandler = ({ location, dice, this_turn }) => {

            let paintData = paintGame({ location, diceValue: dice, snakes, laders, horizontal: enemyCoordinates.horizontal, vertical: enemyCoordinates.vertical })
            changeEnemyCoordinates({ location: paintData.location, diceValue: paintData.diceValue, horizontal: paintData.horizontal, vertical: paintData.vertical })

            setThisTurnPlayerID(this_turn)
        }
        socket.on('receive-update', receiveHandler);

        return () => socket.off('receive-update', receiveHandler)
    }, [socket])


    useEffect(() => {
        // TO DO -> handle popup with {username, victory}
        if (myCoordinates.location == 99) won()

    }, [myCoordinates])

    useEffect(() => {
        // TO DO -> handle popup with {username, victory}
        if (enemyCoordinates.location == 99) won()
    }, [enemyCoordinates])

    return (
        <div>

            <div className={stylesheet.container} style={{ bottom: squareDimension * myCoordinates.vertical, left: squareDimension * myCoordinates.horizontal }}>
                <Character playerImg={getPlayerSVG(myPlayerNumber)} />
            </div>
            <div className={stylesheet.container} style={{ bottom: squareDimension * enemyCoordinates.vertical, left: squareDimension * enemyCoordinates.horizontal }}>
                <Character playerImg={getPlayerSVG(enemyPlayerNumber)} />
            </div>
        </div>
    )
}

export default Player