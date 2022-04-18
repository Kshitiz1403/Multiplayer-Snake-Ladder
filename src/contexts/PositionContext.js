import React, { createContext, useReducer } from 'react'
import diceReducer from '../reducers/diceReducer';
import movementReducer from '../reducers/movementReducer';

export const PositionContext = createContext();
export const PositionProvider = (props) => {
    const [dice, dispatchDice] = useReducer(diceReducer, 0)
    const [location, dispatchLocation] = useReducer(movementReducer, -1)
    return (
        <PositionContext.Provider value={{ dice, dispatchDice, location, dispatchLocation }}>
            {props.children}
        </PositionContext.Provider>
    )
}
