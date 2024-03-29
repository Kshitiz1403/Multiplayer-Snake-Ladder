import React, { useContext, useEffect, useRef } from 'react'
import { LayoutContext } from '../contexts/LayoutContext'
import { DispatchPositionContext, PositionContext } from '../contexts/PositionContext'
import { laders, snakes } from '../configuration'
import { VictoryContext } from '../contexts/VictoryContext'
import { DispatchUserContext, UserContext } from '../contexts/UserContext'
import stylesheet from './Player.module.css'
import { socket } from '../App'
import { paintGame } from '../utils/paintGame'
import switchThisTurnPlayerID from '../utils/switchThisTurnPlayerID'
import getPlayerSVG from '../utils/getPlayerSVG'
import Avatar from './Avatar'

const Player = () => {
    const { squareDimension } = useContext(LayoutContext)
    const { dice, myCoordinates, enemyCoordinates } = useContext(PositionContext)
    const { changeEnemyCoordinates, changeMyCoordinates, setReceivedDice } = useContext(DispatchPositionContext)
    const { won } = useContext(VictoryContext)
    const { myPlayerNumber, enemyPlayerNumber, thisTurnPlayerID, myPlayerName, enemyPlayerName } = useContext(UserContext)
    const { setThisTurnPlayerID } = useContext(DispatchUserContext)

    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) mounted.current = true
        else {
            const { location, diceValue, horizontal, vertical } = paintGame({ location: myCoordinates.location, diceValue: dice.value, snakes, laders, horizontal: myCoordinates.horizontal, vertical: myCoordinates.vertical })

            const switchedID = switchThisTurnPlayerID(thisTurnPlayerID)

            socket.emit('send-update', myCoordinates.location, diceValue, switchedID)
            setThisTurnPlayerID(switchedID)

            changeMyCoordinates({ location, diceValue, horizontal, vertical })
        }

    }, [dice])


    useEffect(() => {
        const receiveHandler = ({ location, dice, this_turn }) => {

            let paintData = paintGame({ location, diceValue: dice, snakes, laders, horizontal: enemyCoordinates.horizontal, vertical: enemyCoordinates.vertical })
            changeEnemyCoordinates({ location: paintData.location, diceValue: paintData.diceValue, horizontal: paintData.horizontal, vertical: paintData.vertical })

            setReceivedDice(dice)

            setThisTurnPlayerID(this_turn)
        }
        socket.on('receive-update', receiveHandler);

        return () => socket.off('receive-update', receiveHandler)
    }, [socket])


    useEffect(() => {
        if (myCoordinates.location === 99) won(myPlayerNumber, myPlayerName)

    }, [myCoordinates])

    useEffect(() => {
        if (enemyCoordinates.location === 99) won(enemyPlayerNumber, enemyPlayerName)
    }, [enemyCoordinates])

    return (
        <div>
            <div className={stylesheet.container} style={{ bottom: squareDimension * myCoordinates.vertical, left: squareDimension * myCoordinates.horizontal }}>
                <Avatar playerImg={getPlayerSVG(myPlayerNumber)} />
            </div>
            <div className={stylesheet.container} style={{ bottom: squareDimension * enemyCoordinates.vertical, left: squareDimension * enemyCoordinates.horizontal }}>
                <Avatar playerImg={getPlayerSVG(enemyPlayerNumber)} />
            </div>
        </div>
    )
}

export default Player