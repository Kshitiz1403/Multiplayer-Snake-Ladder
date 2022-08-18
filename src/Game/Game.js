import React, { useContext } from 'react'
import { VictoryContext } from '../contexts/VictoryContext'
import stylesheet from './Game.module.css'

export const Game = (props) => {
    const { victoryState } = useContext(VictoryContext)

    const VictoryMessage = () => <div>
        <h1 className={stylesheet.victoryContainer}> {victoryState.playerName} won</h1>
    </div>

    return (
        <div>
            {victoryState.status && <VictoryMessage />}
            <div className={stylesheet.backdrop} style={{ opacity: victoryState.status ? 0.5 : 1 }}>
                {props.children}
            </div>
        </div>
    )
}
