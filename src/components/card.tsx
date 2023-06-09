import React from "react"
import { componentID } from "../consts"
import { HighlightWords } from "./highlight_words"
import { createUseStyles } from 'react-jss'
import { CardTitle } from "./card_title"

interface CardProps {
    state: string
    selectedText: string
    position: { x: number, y: number }
    clearApp: () => void
}

export interface HighlightWords {
    word: string
    translation: string
}

const useStyles = createUseStyles({
    card_view: {
        'min-width': '660px',
        'max-width': '660px',
        height: 'auto',
        backgroundColor: 'white',
        position: 'absolute',
        display: 'block',
        'border-radius': '5px',
        'box-shadow': '0 0 8px rgba(0,0,0,.3)',
        borderRadius: '4px',
        font: '14px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        zIndex: '2147483647',
        opacity: '100',
        'padding-bottom': '30px',
    },
    selected_text_wrapper: {
        'min-height': '80px',
        'padding-left': '10px',
        'padding-right': '10px',
        'padding-bottom': '15px',
        'padding-top': '10px',
        display: 'flex',
        '& textarea': {
            width: '95%',
            hight: '120px',
            borderRadius: '0',
            padding: '4px 8px',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'font': 'inherit',
            border: 0,
            'font-size': '12px',
            'background-color': 'rgba(238, 238, 238)',
        }
    },
    translation_wrap: {
        padding: '10px',
        minHeight: '40px',
        'white-space': 'pre-wrap',
    }
})


export const Card = ({ state, selectedText, position, clearApp }: CardProps) => {
    // TODO: 还要补充card本身的一个状态，是否正在获取后端响应
    const [translation, setTranslation] = React.useState("")
    const [words, setWords] = React.useState<HighlightWords[]>([])
    const classes = useStyles()
    let reader: ReadableStreamDefaultReader<Uint8Array> | null

    React.useEffect(() => {
        console.log('use effect fetching translation');
        fetchResponse().catch(err => console.log('fetch error: ', err))
        fetchHighlights().catch(err => console.log('fetch highlight words error: ', err))
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

    const fetchResponse = async () => {
        if (state != "SHOWCARD") {
            return
        }
        setTranslation("")
        console.log('fetch response came in, calling api to get rsp ');

        // 使用Post 请求后端
        let resp = await fetch('http://localhost:8080/api/v1/llm/translate', {
            method: 'POST',
            body: JSON.stringify({
                text: selectedText,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp).catch(err => {
            console.log('fetch erorr: ', err);
            return null;
        });
        console.log("after fetch", resp)
        // 处理fetch出错的情况
        if (resp == null) {
            return;
        }
        console.log('get response now  ');
        if (!resp.ok) {
            return;
        }
        if (!resp.body) {
            return
        }
        reader = resp.body.getReader();
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const str = new TextDecoder().decode(value);
                setTranslation(prevText => prevText + str);
            }

        } finally {
            reader.releaseLock();
        }
    }

    const preventDefault = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
    }

    if (state != "SHOWCARD") {
        return null
    }

    return (
        <>
            <div
                id={componentID("card")}
                style={{ left: position.x + 'px', top: position.y + 'px', }}
                className={classes.card_view}
                onClick={preventDefault}
            >
                <CardTitle onClickClose={clearApp} />

                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }}></div>
                <div
                    className={classes.selected_text_wrapper}>
                    <textarea value={selectedText} readOnly={true} />
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }}></div>
                <HighlightWords state={state} selectedText={selectedText} words={words} />
                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }}></div>
                {/* render response */}
                <div className={classes.translation_wrap}>{translation}</div>

            </div>
        </>
    )
}