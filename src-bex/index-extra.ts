/**
 * This scripts makes it possible for the iBEX to send the connection key to the index site.
 * The index site can use this to store the connection key and to show a warning if the BEX is not running.
 *
 */
import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
let bridge: BexBridge;
console.log('Starting index-extra.ts - 1');

export default bexContent(async (_bridge) => {
	bridge = _bridge;
	bridge.send('log', {
		message: 'index-extra.ts loaded'
	});

	//Does not work...
	// (document as any).bridge = bridge;
	// console.log('(document as any).bridge:', (document as any).bridge);

	let key = (await bridge.send('handy.key')).data;
	console.log('key from bridge:', key);
	if (key === undefined) {
		key = '';
	}
	const bexIdentifier = document.createElement('div');
	bexIdentifier.style.display = 'none';
	bexIdentifier.id = 'bex-identifier';
	bexIdentifier.dataset.key = key;
	document.body.appendChild(bexIdentifier);
})
