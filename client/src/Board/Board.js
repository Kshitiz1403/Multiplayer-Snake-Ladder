import React, { useContext, useLayoutEffect } from 'react'
import { DispatchLayoutContext, LayoutContext } from '../contexts/LayoutContext'
import board from '../assets/board.png'

const Board = () => {

    const { windowHeight } = useContext(LayoutContext)
    const { changeWindowHeight } = useContext(DispatchLayoutContext)

    useLayoutEffect(() => {
        const updateSize = () => {
            changeWindowHeight(window.innerHeight)
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const squares = []
    for (let i = 9; i >= 0; i--) {
        let horizontal = []
        for (let j = 1; j <= 10; j++) {
            horizontal.push(i * 10 + j)
        }
        if (i % 2 === 1) {
            horizontal.reverse()
        }
        squares.push(horizontal)
    }

    return (
        <div>
            <div style={{ height: windowHeight, aspectRatio: 1 }}>
                <img src={board} height={windowHeight}/>
            </div>
        </div>
    )
}

export default Board