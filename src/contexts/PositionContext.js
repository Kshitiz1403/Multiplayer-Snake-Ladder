import React, { createContext, useEffect, useReducer, useState } from 'react'
import diceReducer from '../reducers/diceReducer';
import movementReducer from '../reducers/movementReducer';

export const PositionContext = createContext();
export const DispatchPositionContext = createContext();

export const PositionProvider = (props) => {
    const [dice, dispatchDice] = useReducer(diceReducer, { value: 0, count: 0 })

    const [coordinates, dispatchCoordinates] = useReducer(movementReducer, { location: -1, diceValue: 0, horizontal: -1, vertical: 0 })

    useEffect(() => {
      console.log("dice re render")
    }, [dice])

    useEffect(() => {
      console.log("coordinates re render")
    }, [coordinates])
    
    return (
        <PositionContext.Provider value={{ dice, coordinates }}>
            <DispatchPositionContext.Provider value={{ dispatchDice,  dispatchCoordinates }}>
                {props.children}
            </DispatchPositionContext.Provider>
        </PositionContext.Provider>
    )
}
