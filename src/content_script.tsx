import React from "react";
import { containerRootID, zIndex } from "./const";
import { getContainer } from "./container"
import { createRoot, Root } from 'react-dom/client';
import { App } from "./components/app";

console.log('content script loaded');

let root: Root | null = null

const initRoot = async () => {
  let $container = await getContainer()
  let $root = $container.shadowRoot?.querySelector(`#${containerRootID}`) as HTMLDivElement | null
  // 第一次来，创建一个react app
  if (!$root) {
    $root = document.createElement('div')
    $root.id = containerRootID
    $root.style.position = 'absolute'
    $root.style.zIndex = zIndex

    $container.shadowRoot?.querySelector('div')?.appendChild($root)
    root = createRoot($root)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
}


async function main() {
  let mousedownTarget: EventTarget | null
  let lastMouseEvent: MouseEvent | undefined

  document.addEventListener('mouseup', async (event: MouseEvent) => {
    window.setTimeout(async () => {
      let text = (window.getSelection()?.toString() ?? '').trim()
      console.log(text)
      if (!root) {
        initRoot()
      }
    })
  })

  document.addEventListener('mousedown', (event: MouseEvent) => {
    mousedownTarget = event.target
    console.log('mousedown')
  })
}

main()
