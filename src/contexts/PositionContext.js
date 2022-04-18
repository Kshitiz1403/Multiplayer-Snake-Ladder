import React, { createContext, useReducer, useState } from 'react'
import coordinateReducer from '../reducers/coordinateReducer';
import diceReducer from '../reducers/diceReducer';
import movementReducer from '../reducers/movementReducer';

export const PositionContext = createContext();
export const DispatchPositionContext = createContext();

export const PositionProvider = (props) => {
    const [dice, dispatchDice] = useReducer(diceReducer, { value: 0, temp: 0 })
    const [location, dispatchLocation] = useReducer(movementReducer, -1)
    // const [coordinates, setCoordinates] = useState({ horizontal: -1, vertical: 0 })

    // const updateCoordinates = (horizontal, vertical) => {
    //     setCoordinates({ horizontal, vertical })
    // }
    const [coordinates, dispatchCoordinates] = useReducer(coordinateReducer, { horizontal: -1, vertical: 0 })
    return (
        <PositionContext.Provider value={{ dice, location, coordinates }}>
            <DispatchPositionContext.Provider value={{ dispatchDice, dispatchLocation, dispatchCoordinates }}>
                {props.children}
            </DispatchPositionContext.Provider>
        </PositionContext.Provider>
    )
}
