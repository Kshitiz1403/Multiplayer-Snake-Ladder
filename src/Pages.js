import React, { useContext } from 'react'
import { VictoryContext } from './contexts/VictoryContext'

export const Pages = (props) => {
    const { isVictory, won } = useContext(VictoryContext)
    return (
        <div>
            {isVictory ? <h1 style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 99999999, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>Congratulations!</h1> : null}
            <div style={{ display: 'flex', opacity: isVictory ? 0.5 : 1 }}>
                {props.children}
            </div>
        </div>
    )
}
