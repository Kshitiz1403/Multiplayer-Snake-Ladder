import React, { createContext, useEffect, useState } from "react";

export const LayoutContext = createContext();
export const DispatchLayoutContext = createContext();

export function LayoutProvider(props) {
    const [windowHeight, setWindowHeight] = useState(0)
    const [squareDimension, setSquareDimension] = useState(0);
    useEffect(() => {
        setSquareDimension(windowHeight / 10)
    }, [windowHeight])

    const changeWindowHeight = (height) => setWindowHeight(height)
    return (
        <LayoutContext.Provider value={{ squareDimension, windowHeight }}>
            <DispatchLayoutContext.Provider value={{ changeWindowHeight }}>
                {props.children}
            </DispatchLayoutContext.Provider>
        </LayoutContext.Provider>
    )
}