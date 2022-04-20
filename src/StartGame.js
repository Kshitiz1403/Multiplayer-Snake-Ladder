import React, { useContext } from 'react'
import Board from './Board/Board'
import { UserContext } from './contexts/UserContext'
import Dice from './Dice/Dice'
import { Game } from './Game/Game'
import { JoinRoom } from './JoinRoom'
import Player from './Player/Player'

const StartGame = (props) => {
    const { isUserJoined } = useContext(UserContext)
    return (
        <div>
            {!isUserJoined ?
                <JoinRoom /> :
                <Game>
                    <Board />
                    <Player />
                    <Dice />
                </Game>
            }
        </div>
    )
}

export default StartGame