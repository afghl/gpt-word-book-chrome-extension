import React from "react"
import { componentID } from "../consts"

interface CardProps {
    state: string
    selectedText: string
    position: { x: number, y: number }
    clearApp: () => void
}

export const Card = ({ state, selectedText, position, clearApp }: CardProps) => {
    // TODO: 还要补充card本身的一个状态，是否正在获取后端响应
    const [translation, setTranslation] = React.useState("")
    let reader: ReadableStreamDefaultReader<Uint8Array> | null

    React.useEffect(() => {
        console.log('use effect fetching translation');
        fetchResponse().catch(err => console.log('fetch error: ', err))
        // cancel reader
        return () => {
            console.log('use effect undo');
            if (reader != null) {
                reader.cancel()
                reader.releaseLock()
            }
        }
    }, [state])

    const fetchResponse = async () => {
        if (state != "SHOWCARD") {
            return
        }
        setTranslation("")
        console.log('fetch response came in, calling api to get rsp ');

        let resp = await fetch('http://localhost:8080/api/test')
            .then(resp => resp)
            .catch(err => {
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
                <div onClick={clearApp}>
                    X
                </div>
                <div>{selectedText}</div>
                {/* divider */}
                <div
                    style={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'gray',
                    }}
                ></div>
                {/* render response */}
                <div>{translation}</div>
            </div>
        </>
    )
}