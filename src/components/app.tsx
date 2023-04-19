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

    const clearStates = () => {
        console.log("set state to EMPTY")
        setAppState("EMPTY")
        setSelectedText("")
        setLastEventPosition({ x: 0, y: 0 })
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

        // 这里我有两个做法：1. 每次点击都clearState，管理一个更复杂的生命周期
        // 2. 每次点击，将整个App unmount，每次点击都创建一次app
        document.addEventListener('mousedown', clearStates)
    }, [])

    return (
        <>
            <Button handleButtonClick={handleButtonClick} state={appState} position={lastEventPosition} />
            <Card state={appState} selectedText={selectedText} position={lastEventPosition} />
        </>
    )
}