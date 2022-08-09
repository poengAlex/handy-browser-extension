// src-bex/my-content-script.js

// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'
import background from './background';

let notifyTimer: number;
function showNotify(text: string, type: 'warning' | 'error' | 'success') {
  clearTimeout(notifyTimer);
  console.log('(notify.ts)showNotify', text, type);

  let htmlEl = document.getElementById('handyNotify');
  if (htmlEl === null) {
    htmlEl = document.createElement('div');
    htmlEl.id = 'handyNotify';
    document.body.appendChild(htmlEl);
  }
  if (type === 'error') {
    htmlEl.style.backgroundColor = 'red'
  } else if (type === 'warning') {
    htmlEl.style.backgroundColor = 'yellow'
  } else if (type === 'success') {
    htmlEl.style.backgroundColor = 'green'
  }
  htmlEl.innerHTML = text;
  htmlEl.className = 'show';
  notifyTimer = (setTimeout(function () { htmlEl!.className = htmlEl!.className.replace('show', ''); }, 3000) as unknown) as number;
}

(function () {
  // When the page loads, insert our browser extension app.
  // console.log('Onload - notify.ts');
})()




export default bexContent((bridge) => {
  bridge.on('showNotification', ({ data, respond }) => {
    console.log('(notify.ts) on showNotification:', data);
    showNotify((data as any).text, (data as any).type);
    respond(data);
  })


  bridge.send('log', {
    message: 'notify.ts - loaded'
  })
})