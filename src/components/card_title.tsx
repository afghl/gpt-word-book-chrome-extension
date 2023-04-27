import React from "react"
import { createUseStyles } from "react-jss"

interface CardTitleProps {
    onClickClose: () => void
}


const useStyles = createUseStyles({
    card_title: {
        position: 'relative',
        display: 'flex',
        height: '50px',
        'align-items': 'center',
    },
    card_title_close: {
        position: 'absolute',
        right: '10px',
        top: '5px',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',

    },
    card_title_text: {
        fontWeight: 'bold',
        marginLeft: '10px'
    }
})

export const CardTitle = ({ onClickClose }: CardTitleProps) => {
    const classes = useStyles()
    return (
        <>
            <div className={classes.card_title} >
                <div className={classes.card_title_text}>
                    GPT Word Book: 翻译助手
                </div>
                <div className={classes.card_title_close} onClick={onClickClose}>
                    X
                </div>
            </div>
        </>
    )
}