/**
 * This scripts makes it possible to create "notifys" on the supported website
 *
 */
// src-bex/notift.ts
// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'
import background from './background';
console.log('Starting notify.ts')

let notifyTimer: number;
function showNotify(text: string, type: 'warning' | 'error' | 'success') {
	clearTimeout(notifyTimer);
	console.log('(notify.ts)showNotify', text, type);
	let timeout = 3000;
	let htmlEl = document.getElementById('handyNotify');
	if (htmlEl === null) {
		htmlEl = document.createElement('div');
		htmlEl.id = 'handyNotify';
		document.body.appendChild(htmlEl);
		htmlEl.className = 'show';
	}
	if (type === 'error') {
		htmlEl.style.backgroundColor = 'red'
		timeout = 10000;
	} else if (type === 'warning') {
		htmlEl.style.backgroundColor = 'yellow'
		htmlEl.style.color = 'black'
	} else if (type === 'success') {
		htmlEl.style.backgroundColor = 'green'
	}
	htmlEl.innerHTML = text;

	notifyTimer = (setTimeout(function () {
		console.log('Clearing notify');
		htmlEl!.className = htmlEl!.className.replace('show', '');
	}, timeout) as unknown) as number;
}

(function () {
	// When the page loads, insert our browser extension app.
	// console.log('Onload - notify.ts');
})()




export default bexContent((bridge) => {
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		// console.log('onMessage', message);
		if (message.action === 'notify') {
			const { text, type } = message;
			showNotify(text, type)
			// console.warn('showNotification', message);
		}
		sendResponse();
		return true;
	});

	//DOES NOT WORK!
	// bridge.on('showNotification', ({ data, respond }) => {
	// 	console.log('(notify.ts) on showNotification:', data);
	// 	showNotify((data as any).text, (data as any).type);
	// 	respond(data);
	// })


	bridge.send('log', {
		message: 'notify.ts - loaded'
	})
})
