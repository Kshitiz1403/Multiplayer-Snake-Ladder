import React, { createContext, useState } from 'react'

export const VictoryContext = createContext();

export const VictoryProvider = (props) => {
    const [isVictory, setIsVictory] = useState(false)
    const won = () => {
        setIsVictory(true)
    }
    return (
        <VictoryContext.Provider value={{ isVictory, won }}>
            {props.children}
        </VictoryContext.Provider>
    )
}
