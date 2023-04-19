import React from "react"
import { componentID } from "../const"

interface CardProps {
    state: string
    selectedText: string
    position: { x: number, y: number }
}

export const Card = ({ state, selectedText, position }: CardProps) => {
    // Button需要从父组件（App）里获取到鼠标点击的位置
    if (state != "SHOWCARD") {
        return null
    }

    function preventDefault(e: any) {
        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <>
            <div
                id={componentID("card")}
                style={{
                    width: '300px',
                    height: '300px',
                    backgroundColor: 'aliceblue',
                    position: 'absolute',
                    left: position.x + 'px',
                    top: position.y + 'px',
                }}
                className="card-view"
                onClick={preventDefault}
            >
                <div>{selectedText}</div>
            </div>
        </>
    )
}