import React from "react"
import { componentID } from "../consts"
import { createUseStyles } from "react-jss"
import icon from '../../public/icon.png'

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
    // let icon = "test"
    console.log("Button render, icon", icon);

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
                    borderRadius: '3px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 4px',
                }}
                className="button-view"
                onClick={handleButtonClick}
            >
                <img src={icon} style={{
                    width: '27px',
                    height: '27px',
                }}></img>
            </div>

        </>
    )
}