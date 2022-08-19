import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { socket } from './App'
import { DispatchUserContext } from './contexts/UserContext'

export const JoinRoom = () => {

    const { setMyPlayerNumber, setRoomID, setMyPlayerName, setEnemyPlayerName } = useContext(DispatchUserContext)

    const [tempRoomID, setTempRoomID] = useState('')
    const [tempUserName, setTempUserName] = useState('')

    const joinOrCreateRoom = (tempUserName, tempRoomID) => {
        socket.emit('join_room', { userName: tempUserName, room: tempRoomID })
        setRoomID(tempRoomID)

        socket.on('roomUsers', data => {
            const user = data.users.find(user => user.id === socket.id)
            const enemy = data.users.find(enemy => enemy.id !==socket.id)
            console.log(enemy)
            setMyPlayerNumber(user.playerNumber)
            setMyPlayerName(user.username)
            setEnemyPlayerName(enemy?.username)
        })
    }

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0E1525', }}>
            <form onSubmit={(e) => {
                e.preventDefault();
                joinOrCreateRoom(tempUserName, tempRoomID)
            }} >
                <Box
                    sx={{
                        minWidth: 300,
                        minHeight: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 4,
                        borderRadius: 2
                    }}>

                    <Typography variant='h6' style={{ textAlign: 'center', color: 'whitesmoke', userSelect: "none" }}>
                        Enter Room ID
                    </Typography>
                    <TextField
                        onChange={v => setTempRoomID(v.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        id="Room ID"
                        label="Room ID"
                        name="Room ID"
                        value={tempRoomID}
                        autoFocus
                        autoComplete='off'
                        size='small'
                        sx={{ backgroundColor: '#1c2333', }}

                        inputProps={{ sx: { color: 'whitesmoke', overflow: 'hidden' } }}
                        InputLabelProps={{
                            style: { color: "#9e9c89", },
                        }}
                    />
                    <TextField
                        onChange={v => setTempUserName(v.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        id="Username"
                        label="Username"
                        name="Username"
                        value={tempUserName}
                        autoComplete='off'
                        size='small'
                        sx={{ backgroundColor: '#1c2333', }}

                        inputProps={{ sx: { color: 'whitesmoke', overflow: 'hidden' } }}
                        InputLabelProps={{
                            style: { color: "#9e9c89", },
                        }}
                    />
                    <Button type="submit" variant='contained' style={{ marginTop: 20, marginBottom: 20 }}>
                        Join
                    </Button>
                </Box>
            </form>
        </div>
    )
}
