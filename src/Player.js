import React, { useContext, useEffect } from 'react'
import player1 from './assets/player/mummy-head.svg'
import player2 from './assets/player/cleopatra.svg'
import { LayoutContext } from './contexts/LayoutContext'
import { PositionContext } from './contexts/PositionContext'
const Player = () => {
    const { squareDimension, changeWindowHeight, windowHeight } = useContext(LayoutContext)
    const { dice, location, dispatchLocation } = useContext(PositionContext)

    const Character = () => (
        <div style={{ width: squareDimension, height: squareDimension, display: 'flex', justifyContent: 'center', alignItems: 'center', zoom: 0.6, padding: squareDimension * 0.4 }}>
            <img src={player1} />
        </div>
    )
    useEffect(() => {
        dispatchLocation({ type: "INCREMENT", value: dice })
    }, [dice])

    const movementHandler = (coordinates) => {
        const verticalCor = Math.floor(coordinates / 10)
        let horizontalCor
        if (verticalCor % 2 == 1) { horizontalCor = 9 - coordinates % 10 }
        else { horizontalCor = coordinates % 10 }
        // }
        return { horizontalCor, verticalCor }
    }
    return (
        <div style={{ position: 'absolute', bottom: squareDimension * movementHandler(location).verticalCor, left: squareDimension * movementHandler(location).horizontalCor }}>
            <Character />
        </div>
    )
}

export default Player