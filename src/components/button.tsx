import React from "react"
import { componentID } from "../consts"

interface ButtonProps {
    state: string
    handleButtonClick: (e: any) => void
    position: { x: number, y: number }
}

export const Button = ({ state, handleButtonClick, position }: ButtonProps) => {
    // Button需要从父组件（App）里获取到鼠标点击的位置
    if (state != "SHOWBUTTON") {
        return null
    }

    return (
        <>
            <div
                id={componentID("btn")}
                style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'red',
                    position: 'absolute',
                    left: position.x + 'px',
                    top: position.y + 'px',
                }}
                className="button-view"
                onClick={handleButtonClick}
            />
        </>
    )
}