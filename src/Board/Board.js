import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { laders, snakes } from '../config'
import { DispatchLayoutContext, LayoutContext } from '../contexts/LayoutContext'
import { PositionContext } from '../contexts/PositionContext'
import stylesheet from './Board.module.css'

const Board = () => {

    const { squareDimension, windowHeight } = useContext(LayoutContext)
    const {changeWindowHeight} = useContext(DispatchLayoutContext)

    const { location } = useContext(PositionContext)

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
        if (i % 2 == 1) {
            horizontal.reverse()
        }
        squares.push(horizontal)
    }

    const Square = ({ square, snakes, laders, styles }) => (
        <div className={stylesheet.squareStyles} style={{...styles}}>
            <div style={{ fontSize: squareDimension * 0.25 }}>{location + 1 != square ? square : null}</div>
            <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
                {snakes.map(snake => snake.from == square ? <div style={{ color: 'red', fontSize: squareDimension * 0.25 }} key={snake}>S{snake.to}</div> : null
                )}
                {laders.map(lader => lader.from == square ? <div style={{ color: 'blue', fontSize: squareDimension * 0.25 }} key={lader}>L{lader.to}</div> : null)}
            </div>
        </div>
    )

    return (
        <div>
            <div style={{ height: windowHeight, aspectRatio: 1 }}>
                {squares.map((horizontalArr, horIndex) =>
                    <div className={stylesheet.horizontalStyles} key={horIndex}>
                        {horizontalArr.map((square, index) =>
                            <Square
                                key={horIndex * 10 + index}
                                styles={{ aspectRatio: 1, width: '100%', backgroundColor: (horIndex % 2 == 0 && index % 2 == 1) ? '#ffef85' : (horIndex % 2 == 1 && index % 2 == 0) ? '#ffef85' : '#f9a500' }}
                                snakes={snakes}
                                laders={laders}
                                square={square}
                            />
                        )}
                    </div>)}
            </div>
        </div>
    )
}

export default Board