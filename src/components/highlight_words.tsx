
import React from "react"
import { createUseStyles } from "react-jss"

interface HighlightWordsProps {
    state: string
    selectedText: string
}

interface HighlightWords {
    word: string
    translation: string
}

export const HighlightWords = ({ state, selectedText }: HighlightWordsProps) => {
    const [words, setWords] = React.useState<HighlightWords[]>([])
    const classes = useStyles()
    let reader: ReadableStreamDefaultReader<Uint8Array> | null

    React.useEffect(() => {
        fetchHighlights().catch(err => console.log('fetch error: ', err))
        // cancel reader
        return () => {
            console.log('use effect undo');
            if (reader != null && !reader.closed) {
                reader.releaseLock()
                reader.cancel()
            }
        }
    }, [state])

    const fetchHighlights = async () => {
        // 使用Post 请求后端
        let resp = await fetch('http://localhost:8080/api/v1/llm/find_highlights', {
            method: 'POST',
            body: JSON.stringify({
                text: selectedText,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp).catch(err => {
            console.log('find highlights fetch erorr: ', err);
            return null;
        });
        console.log("find highlights  after fetch", resp)
        // 处理fetch出错的情况
        if (resp == null) {
            return;
        }
        if (!resp.ok) {
            return;
        }
        if (!resp.body) {
            return
        }
        // 用json解析resp.body
        let json = await resp.json().catch(err => {
            console.log('find highlights fetch erorr: ', err);
            return null;
        });
        // 处理json解析出错的情况
        if (json == null) {
            return;
        }
        console.log("find highlights json", json)
        // 用json的值更新words
        setWords(json)
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
