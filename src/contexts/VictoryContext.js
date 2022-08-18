import React, { createContext, useState } from 'react'

export const VictoryContext = createContext();

export const VictoryProvider = (props) => {
    const [victoryState, setIsVictoryState] = useState({ playerNumber: -1, playerName: "", status: false })
    const won = (playerNumber, playerName) => {
        setIsVictoryState({ playerNumber: playerNumber, playerName: playerName, status: true })
    }
    return (
        <VictoryContext.Provider value={{ victoryState, won }}>
            {props.children}
        </VictoryContext.Provider>
    )
}
