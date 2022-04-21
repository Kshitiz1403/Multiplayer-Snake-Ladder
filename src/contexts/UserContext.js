import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext()
export const DispatchUserContext = createContext()

export const UserProvider = (props) => {
    const [roomID, setRoomID] = useState('')
    const [isUserJoined, setIsUserJoined] = useState(false)
    const [myPlayerNumber, setMyPlayerNumber] = useState(0)
    const [enemyPlayerNumber, setEnemyPlayerNumber] = useState(0)
    const [thisTurnPlayerID, setThisTurnPlayerID] = useState(2)

    useEffect(() => {
        if (roomID) {
            setIsUserJoined(true)
        }
    }, [roomID])

    useEffect(() => {
        if (myPlayerNumber == 1) setEnemyPlayerNumber(2)
        if (myPlayerNumber == 2) setEnemyPlayerNumber(1)
    }, [myPlayerNumber])


    return (
        <UserContext.Provider value={{
            roomID, myPlayerNumber, enemyPlayerNumber, isUserJoined, thisTurnPlayerID
        }}>
            <DispatchUserContext.Provider value={{ setRoomID, setMyPlayerNumber, setThisTurnPlayerID }}>
                {props.children}
            </DispatchUserContext.Provider>
        </UserContext.Provider>
    )
}
