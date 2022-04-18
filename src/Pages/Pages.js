import React, { useContext } from 'react'
import { VictoryContext } from '../contexts/VictoryContext'
import stylesheet from './Pages.module.css'

export const Pages = (props) => {
    const { isVictory, won } = useContext(VictoryContext)
    return (
        <div>
            {isVictory ? <h1 className={stylesheet.victoryContainer}>Congratulations!</h1> : null}
            <div className={stylesheet.backdrop} style={{ opacity: isVictory ? 0.5 : 1 }}>
                {props.children}
            </div>
        </div>
    )
}
