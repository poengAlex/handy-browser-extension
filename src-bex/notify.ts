// src-bex/my-content-script.js

// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'


const
  iFrame = document.createElement('iframe'),
  defaultFrameHeight = '100vh'

/**
 * Set the height of our iFrame housing our BEX
 * @param height
 */
const setIFrameHeight = height => {
  iFrame.height = height
}

/**
 * Reset the iFrame to its default height e.g The height of the top bar.
 */
const resetIFrameHeight = () => {
  setIFrameHeight(defaultFrameHeight)
}

/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
iFrame.id = 'bex-app-iframe'
iFrame.width = '100%'
resetIFrameHeight()

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible'
})

  ; (function () {
    // When the page loads, insert our browser extension app.
    console.log('Onload - my-content-script.ts');

    // iFrame.src = chrome.runtime.getURL('www/index.html')
    // document.body.prepend(iFrame)
    // console.log('STARTED');
    // setIFrameHeight('100%')
  })()


let notifyTimer: number;
function showNotify(text: string, type: 'warning' | 'error' | 'success') {
  clearTimeout(notifyTimer);
  console.log('showNotify', text, type);

  let htmlEl = document.getElementById('handyNotify');
  if (htmlEl === null) {
    htmlEl = document.createElement('div');
    htmlEl.id = 'handyNotify';
    document.body.appendChild(htmlEl);
  }
  htmlEl.innerHTML = text;
  htmlEl.className = 'show';
  notifyTimer = (setTimeout(function () { htmlEl.className = htmlEl.className.replace('show', ''); }, 3000) as unknown) as number;
}

export default bexContent((bridge) => {
  /**
   * When the drawer is toggled set the iFrame height to take the whole page.
   * Reset when the drawer is closed.
   */
  bridge.on('wb.drawer.toggle', ({ data, respond }) => {
    if (data.open) {
      setIFrameHeight('100%')
    } else {
      resetIFrameHeight()
    }
    respond()
  });

  bridge.on('showNotification', ({ data, respond }) => {
    console.log('(content-script)showNotification:', data);
    showNotify((data as any).text, (data as any).type);
    respond(data);
  })


  bridge.send('log', {
    message: 'my-content-script.ts - loaded'
  })
})