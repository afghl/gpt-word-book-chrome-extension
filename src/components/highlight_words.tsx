
import React from "react"
import { createUseStyles } from "react-jss"


interface HighlightWordsProps {
    state: string
    selectedText: string
    words: any[]
}

export const HighlightWords = ({ state, selectedText, words }: HighlightWordsProps) => {
    const classes = useStyles()
    // let reader: ReadableStreamDefaultReader<Uint8Array> | null

    React.useEffect(() => {
        return () => {
            saveWords()
        }
    }, [words])

    const saveWords = async () => {
        // 这里获取state里的words, 为什么是空的呢？
        // 原因是：这里的words是在fetchHighlights里面更新的，而fetchHighlights是在useEffect里面调用的
        console.log("going into save words, words: ", words)
        if (words.length == 0) {
            return
        }
        let resp = await fetch('http://localhost:8080/api/v1/wordbook/words', {
            method: 'POST',
            body: JSON.stringify({
                text: selectedText,
                words: words,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp).catch(err => {
            console.log('fetch erorr: ', err);
            return null;
        })
    }

    const getRandomWordColor = (classes: any) => {
        let index = Math.floor(Math.random() * wordColors.length)
        return classes[wordColors[index]]
    }

    return (
        <>
            <div className={classes.highlight_words_wrap} >
                <div className={classes.highlight_words} >
                    {/* 遍历words，渲染 item  */}
                    {words.map((item, index) => (
                        <div key={index} className={classes.highlight_words_item + " " + getRandomWordColor(classes)}>
                            {/* 这里要有两个className */}
                            <span className={classes.word}>{item.word} </span>
                            <span className={classes.word_translation}>[{item.translation}]</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const wordColors = ["word_green", "word_yellow", "word_blue", "word_purple", "word_red", "word_orange"]

// 这里createUseStyles需要使用wordColors

const useStyles = createUseStyles({
    highlight_words_wrap: {
        padding: '10px',
    },
    highlight_words: {
        padding: '0 5px',
        display: 'flex',
        'flex-wrap': 'wrap',
    },
    highlight_words_item: {
        border: '1px solid rgb(219, 237, 219, 0.5)',
        margin: '2px',
        paddingLeft: '2px',
        paddingRight: '2px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    word: {
        fontSize: '14px',
    },
    word_translation: {
        fontSize: "13px",
        color: "rgba(0, 0, 0, 0.6);",
    },
    'word_green': { 'backgroundColor': 'rgb(219, 237, 219)' },
    'word_yellow': { 'backgroundColor': 'rgb(255, 255, 204)' },
    'word_red': { 'backgroundColor': 'rgb(255, 204, 204)' },
    'word_blue': { 'backgroundColor': 'rgb(204, 229, 255)' },
    'word_purple': { 'backgroundColor': 'rgb(229, 204, 255)' },
    'word_orange': { 'backgroundColor': 'rgb(255, 229, 204)' },
    'word_gray': { 'backgroundColor': 'rgb(204, 204, 204)' },
})
