import React from "react"
import { componentID } from "../consts"
import { createUseStyles } from "react-jss"
import my_icon from './icon.png'

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
    console.log("Button render, icon", my_icon);

    return (
        <>
            <div
                id={componentID("btn")}
                style={{
                    width: '27px',
                    height: '27px',
                    position: 'absolute',
                    left: position.x + 30 + 'px',
                    top: position.y + 30 + 'px',
                    borderRadius: '4px',
                    boxShadow: 'rgba(0, 0, 0, 0.5) 1px 1px 3px',
                    display: 'flex'
                }}
                className="button-view"
                onClick={handleButtonClick}
            >
                <img src={my_icon} style={{
                    width: '27px',
                    height: '27px',
                    'borderRadius': '4px',
                }}></img>
            </div>

        </>
    )
}