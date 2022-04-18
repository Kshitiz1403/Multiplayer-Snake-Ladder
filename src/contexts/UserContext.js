import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext()

export const UserProvider = (props) => {
    const [roomID, setRoomID] = useState('')
    const [isUserJoined, setIsUserJoined] = useState(false)
    const [players, setPlayers] = useState(0)
    const [myPlayerID, setMyPlayerID] = useState(2)
    const [opponentPlayerID, setOpponentPlayerID] = useState(0)

    const changeRoomID = (room) => {
        setRoomID(room)
    }
    const changePlayers = (player) => {
        setPlayers(player)
    }
    useEffect(() => {
        let tempMyPlayerID
        if (players === 1) {
            tempMyPlayerID = 1
            setMyPlayerID(1)
        }
        if (tempMyPlayerID==1){
            setOpponentPlayerID(2)
        }
        else{
            setOpponentPlayerID(1)
        }
    }, [players])


    useEffect(() => {
        if (roomID) {
            setIsUserJoined(true)
        }
    }, [roomID])

    return (
        <UserContext.Provider value={{ roomID, changeRoomID, isUserJoined, players, changePlayers, myPlayerID, opponentPlayerID }}>
            {props.children}
        </UserContext.Provider>
    )
}
