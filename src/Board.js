import React, { useEffect, useState } from 'react'
import { laders, snakes } from './config'

const Board = () => {
    useEffect(() => {
        setWindowHeight(window.innerHeight)
    }, [])

    const [windowHeight, setWindowHeight] = useState(0);

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

    const styles = {
        squareStyles: {
            borderColor: 'black', borderWidth: 1, borderStyle: 'solid', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'
        },
        horizontalStyles: {
            display: 'flex', justifyContent: 'space-around'
        }
    }

    const Square = ({ square, snakes, laders, styles }) => (
        <div style={{ ...styles }}>
            <div>{square}</div>
            <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
                {snakes.map(snake => snake.from == square ? <div style={{ color: 'red' }} key={snake}>S{snake.to}</div> : null
                )}
                {laders.map(lader => lader.from == square ? <div style={{ color: 'blue' }} key={lader}>L{lader.to}</div> : null)}
            </div>
        </div>
    )

    return (
        <div>
            <div style={{ height: windowHeight, aspectRatio: 1 }}>
                {squares.map((horizontalArr, horIndex) =>
                    <div style={{ ...styles.horizontalStyles }} key={horIndex}>
                        {horizontalArr.map((square, index) =>
                            <Square
                                key={index}
                                styles={{ ...styles.squareStyles, aspectRatio: 1, width: '100%', backgroundColor: (horIndex % 2 == 0 && index % 2 == 1) ? '#ffef85' : (horIndex % 2 == 1 && index % 2 == 0) ? '#ffef85' : '#f9a500' }}
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