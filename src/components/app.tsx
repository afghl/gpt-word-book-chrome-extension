import React from "react"
import { Button } from "./button"
import { Card } from "./card"

export const App = () => {
    const [appState, setAppState] = React.useState("EMPTY")
    const [selectedText, setSelectedText] = React.useState("")
    const [lastEventPosition, setLastEventPosition] = React.useState({ x: 0, y: 0 })

    const updatePosition = (event: MouseEvent) => {
        setLastEventPosition({ x: event.clientX, y: event.clientY })
    }

    const handleSelectText = (text: string, event: MouseEvent) => {
        if (appState === "SHOWCARD") {
            return
        }
        setAppState("SHOWBUTTON")
        setSelectedText(text)
        updatePosition(event)
    }

    const handleButtonClick = (event: MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        setAppState("SHOWCARD")
        updatePosition(event)
    }

    React.useEffect(() => {
        document.addEventListener('mouseup', async (event: MouseEvent) => {
            window.setTimeout(async () => {
                let text = (window.getSelection()?.toString() ?? '').trim()
                if (text != "") {
                    handleSelectText(text, event)
                }
            })
        })

        document.addEventListener('mousedown', (event: MouseEvent) => {
            setAppState("EMPTY")
        })
    }, [])

    return (
        <>
            <Button handleButtonClick={handleButtonClick} state={appState} position={lastEventPosition} />
            <Card state={appState} selectedText={selectedText} position={lastEventPosition} />
        </>
    )
}