const users = []

export const userJoin = (id, username, room) => {
    // TODO -> handler correct room number
    // TODO -> accept max 2 connections

    let playerNumber = 0;
    users.map(user => {
        if (user.room === room) {
            playerNumber++;
        }
    })
    const user = { id, username, room, playerNumber: playerNumber + 1 }

    users.push(user)

    return user
}

export const getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}

export const getRoomUsers = (room) => {
    return users.filter(user => user.room === room)
}