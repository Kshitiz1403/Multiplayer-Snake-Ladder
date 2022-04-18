import React, { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { socket } from './App'
import { UserContext } from './contexts/UserContext'

export const JoinRoom = () => {

    const { changeRoomID, roomID, players, changePlayers } = useContext(UserContext);

    const [tempRoomID, setTempRoomID] = useState('')

    const joinOrCreateRoom = (tempRoomID) => {
        socket.emit('join_room', tempRoomID, (status) => {
            if (status) {
                changeRoomID(tempRoomID)
            }
        })
    }
    socket.on('total', data => changePlayers(data.length))



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>
                Enter Room ID
            </div>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    joinOrCreateRoom(tempRoomID)
                }} >
                    <input value={tempRoomID} onChange={v => setTempRoomID(v.target.value)} />
                    <button type='submit'>Join</button>
                </form>
            </div>
        </div>
    )
}
