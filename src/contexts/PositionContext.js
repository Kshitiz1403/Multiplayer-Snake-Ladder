import React, { createContext, useReducer, useState } from 'react'
import diceReducer from '../reducers/diceReducer';

export const PositionContext = createContext();
export const DispatchPositionContext = createContext();

export const PositionProvider = (props) => {
  const [dice, dispatchDice] = useReducer(diceReducer, { value: 0, count: 0 })
  const [receivedDice, setReceivedDice] = useState(0)

  const [myCoordinates, setMyCoordinates] = useState({ location: -1, diceValue: 0, horizontal: -1, vertical: 0 })
  const [enemyCoordinates, setEnemyCoordinates] = useState({ location: -1, diceValue: 0, horizontal: -1, vertical: 0 })

  const changeEnemyCoordinates = (val) => {
    setEnemyCoordinates(val)
  }
  const changeMyCoordinates = (val) => {
    setMyCoordinates(val)
  }

  return (
    <PositionContext.Provider value={{ dice, myCoordinates, enemyCoordinates, receivedDice }}>
      <DispatchPositionContext.Provider value={{ dispatchDice, changeEnemyCoordinates, changeMyCoordinates, setReceivedDice }}>
        {props.children}
      </DispatchPositionContext.Provider>
    </PositionContext.Provider>
  )
}