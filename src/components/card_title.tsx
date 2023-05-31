import React from "react"
import { createUseStyles } from "react-jss"

interface CardTitleProps {
    onClickClose: () => void
}

const useStyles = createUseStyles({
    card_title: {
        display: 'flex',
        height: '47px',
        'align-items': 'center',
        justifyContent: 'space-between',
    },
    card_title_close: {
        fontWeight: 'bold',
        fontSize: '16px',
        height: '100%',
        cursor: 'pointer',
        marginRight: '13px'
    },
    card_title_close_i: {
        width: '16px',
        height: '16px',
        'font-size': '16px',
        'line-height': '16px',
        color: '#5f7d95',
        fill: '#5f7d95',
        position: "relative",
        'background-image': "",
        "&:before": {
            content: "\" \" ",
            '-webkit-transform': 'rotate(-45deg)',
            '-moz-transform': 'rotate(-45deg)',
            '-ms-transform': 'rotate(-45deg)',
            '-o-transform': 'rotate(-45deg)',
            'transform': 'rotate(-45deg)',
            display: "block",
            'margin': '-3px 0 0 -1px',
            background: "#bac8d3",
            height: '1.2em',
            width: '0.15em',
            position: 'absolute',
            top: '15px',
            bottom: 0,
            left: '-10px',
        },
        "&:after": {
            content: "\" \" ",
            '-webkit-transform': 'rotate(45deg)',
            '-moz-transform': 'rotate(45deg)',
            '-ms-transform': 'rotate(45deg)',
            '-o-transform': 'rotate(45deg)',
            'transform': 'rotate(45deg)',
            display: "block",
            'margin': '-3px 0 0 -1px',
            background: "#bac8d3",
            height: '1.2em',
            width: '0.15em',
            position: 'absolute',
            top: '15px',
            right: '3px',
            bottom: 0,
            left: '-10px',
        }
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
                    <i className={classes.card_title_close_i}>
                        {/* add before */}

                    </i>
                </div>
            </div>
        </>
    )
}