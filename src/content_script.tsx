import React from "react";
import { containerRootID, zIndex } from "./consts";
import { getContainer, removeContainer } from "./container"
import { createRoot, Root } from 'react-dom/client';
import preset from 'jss-preset-default';
import { JssProvider, createGenerateId } from 'react-jss';
import { create } from 'jss'
import { App } from "./components/app";

console.log('content script loaded');

let root: Root | null = null
const generateId = createGenerateId()

const renderApp = async (event: MouseEvent, text: string) => {
  let $container = await getContainer()
  let $root = $container.shadowRoot?.querySelector(`#${containerRootID}`) as HTMLDivElement | null
  // 第一次来，创建一个react app
  if (!$root) {
    $root = document.createElement('div')
    $root.id = containerRootID
    // $root.style.position = 'absolute'
    $root.style.zIndex = zIndex

    $container.shadowRoot?.querySelector('div')?.appendChild($root)

    const jss = create().setup({
      ...preset(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      insertionPoint: $root.parentElement as any,
    })
    root = createRoot($root)
    root.render(
      <>
        <JssProvider jss={jss} generateId={generateId} classNamePrefix='__gpt-word-book-jss-'>
          <App selectedText={text} initPosition={{ x: event.pageX, y: event.pageY }} clearApp={clearApp} />
        </JssProvider>

      </>
    )
  }
}

const clearApp = () => {
  if (root) {
    root.unmount()
    root = null
  }

  removeContainer()
}

function main() {
  // 走更简单的玩法，document监听点击事件，如果有选中text，就render app， 然后再监听个mousedown事件，直接销毁app
  document.addEventListener('mouseup', async (event: MouseEvent) => {
    window.setTimeout(async () => {
      let text = (window.getSelection()?.toString() ?? '').trim()
      if (text == "") {
        return
      }
      renderApp(event, text)
    })
  })

  // 这里我有两个做法：1. 每次点击都clearState，管理一个更复杂的生命周期
  // 2. 每次点击，将整个App unmount，每次点击都创建一次app

  document.addEventListener('mousedown', clearApp);
}

main()


