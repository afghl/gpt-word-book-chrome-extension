import React from "react";
import { containerRootID, zIndex } from "./const";
import { getContainer } from "./container"
import { createRoot, Root } from 'react-dom/client';
import { App } from "./components/app";

console.log('content script loaded');

let root: Root | null = null

const initRoot = async () => {
  console.log('init root')

  let $container = await getContainer()
  let $root = $container.shadowRoot?.querySelector(`#${containerRootID}`) as HTMLDivElement | null
  // 第一次来，创建一个react app
  if (!$root) {
    $root = document.createElement('div')
    $root.id = containerRootID
    // $root.style.position = 'absolute'
    $root.style.zIndex = zIndex

    $container.shadowRoot?.querySelector('div')?.appendChild($root)
    root = createRoot($root)
    root.render(
      <div>
        <App />
      </div>
    )
  }
}


async function main() {
  window.setTimeout(initRoot, 100)
}

main()
