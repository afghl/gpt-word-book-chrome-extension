import React from "react"
import { Button } from "./button"
import { Card } from "./card"

interface AppProps {
    selectedText: string
    initPosition: { x: number, y: number }
    clearApp: () => void
}

export const App = ({ selectedText, initPosition, clearApp }: AppProps) => {
    const [appState, setAppState] = React.useState("SHOWBUTTON")
    const [lastEventPosition, setLastEventPosition] = React.useState(initPosition)

    const updatePosition = (event: MouseEvent) => {
        setLastEventPosition({ x: event.pageX, y: event.pageY })
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
            <Card state={appState} selectedText={selectedText} position={lastEventPosition} clearApp={clearApp} />
        </>
    )
}