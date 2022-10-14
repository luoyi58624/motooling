import Clipboard from 'clipboard'

export default function copyText (event) {
  const clipboard = new Clipboard(event.target)
  clipboard.on('success', (e) => {
    console.log(e)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
