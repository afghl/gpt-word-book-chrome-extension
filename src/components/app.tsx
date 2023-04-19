import React from "react"
import { Button } from "./button"
import { Card } from "./card"

interface AppProps {
    selectedText: string
    initPosition: { x: number, y: number }
}

export const App = ({ selectedText, initPosition }: AppProps) => {
    const [appState, setAppState] = React.useState("SHOWBUTTON")
    const [lastEventPosition, setLastEventPosition] = React.useState(initPosition)

    const updatePosition = (event: MouseEvent) => {
        setLastEventPosition({ x: event.clientX, y: event.clientY })
    }

    const handleButtonClick = (event: MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        setAppState("SHOWCARD")
        updatePosition(event)
    }

    return (
        <>
            <Button handleButtonClick={handleButtonClick} state={appState} position={lastEventPosition} />
            <Card state={appState} selectedText={selectedText} position={lastEventPosition} />
        </>
    )
}