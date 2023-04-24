
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
        console.log('use effect fetching translation');
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
        console.log('fetch response came in, calling api to get rsp ');
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


    return (
        <>
            <div className={classes.highlight_words} >
                {/* 遍历words，渲染 item  */}
                {words.map((item, index) => (
                    <div key={index} className={classes.highlight_words_item}>
                        <span>{item.word}</span>
                        <span>{item.translation}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

const useStyles = createUseStyles({
    highlight_words: {
        padding: '10px',
    },
    highlight_words_item: {
        border: '1px solid black',
    }
})
