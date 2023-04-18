import { getContainer } from "./container"

console.log('content script loaded');


async function main() {
  let mousedownTarget: EventTarget | null
  let lastMouseEvent: MouseEvent | undefined

  document.addEventListener('mouseup', async (event: MouseEvent) => {
    window.setTimeout(async () => {
      let text = (window.getSelection()?.toString() ?? '').trim()
      console.log(text)
      let $container = await getContainer()
      console.dir($container)
    })
  })

  document.addEventListener('mousedown', (event: MouseEvent) => {
    mousedownTarget = event.target
    console.log('mousedown')
  })
}


main()