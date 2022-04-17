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
            borderColor: 'black', borderWidth: 1, borderStyle: 'solid',  display: 'flex', justifyContent: 'center', alignItems: 'center',
        },
        horizontalStyles: {
            display: 'flex', justifyContent: 'space-around'
        }
    }

    return (
        <div  style={{height:windowHeight, aspectRatio:1}}>
            <div>
                {squares.map((horizontalArr, horIndex) =>
                    <div style={{ ...styles.horizontalStyles }}>
                        {horizontalArr.map((square, index) =>
                            <div style={{ ...styles.squareStyles, aspectRatio: 1, width: '100%', backgroundColor: (horIndex % 2 == 0 && index % 2 == 1) ? '#ffef85' : (horIndex % 2 == 1 && index % 2 == 0) ? '#ffef85' : '#f9a500' }}>
                                <div>
                                    {square}
                                    {snakes.map(snake =>
                                        (snake.from == square) ? <div style={{color:'red'}}>S{snake.to}</div> : null
                                    )}
                                    {laders.map(lader=> lader.from==square? <div style={{color:'blue'}}>L{lader.to}</div>:null)}
                                </div>
                            </div>
                        )}
                    </div>)}
            </div>
        </div>
    )
}

export default Board