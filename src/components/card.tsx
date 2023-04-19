import React from "react"
import { componentID } from "../consts"

interface CardProps {
    state: string
    selectedText: string
    position: { x: number, y: number }
}

export const Card = ({ state, selectedText, position }: CardProps) => {
    // TODO: 还要补充card本身的一个状态，是否正在获取后端响应
    const [translation, setTranslation] = React.useState("")
    React.useEffect(() => {
        console.log('use effect fetching translation');
        fetchResponse()

    }, [state])

    const fetchResponse = async () => {
        if (state != "SHOWCARD") {
            return
        }
        setTranslation("")
        console.log('fetch response came in, calling api to get rsp ');

        let resp = await fetch('http://localhost:8080/api/test')

        console.log('get response now  ');
        if (!resp.ok) {
            return;
        }
        if (!resp.body) {
            return
        }
        const reader = resp.body.getReader();

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

    function preventDefault(e: any) {
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