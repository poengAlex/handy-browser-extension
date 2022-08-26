/**
 * Script spesific for pornhub site and pornhub embed videos
 *
 *
 * Test script: https://sweettecheu.s3.eu-central-1.amazonaws.com/test/ph5b130705d40d9.funscript
 * https://sweettecheu.s3.eu-central-1.amazonaws.com/test/ph5b130705d40d9.csv
 *
 * {
	  "matches": [
		"https://www.pornhub.com/*"
	  ],
	  "all_frames": true,
	  "run_at": "document_idle",
	  "js": [
		"pornhub-embed.js"
	  ]
	},
 */



import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { setVideoPlayer } from './assets/player';
const PARTNERID = 'pornhub.com';
let bridge: BexBridge;
console.log('Starting pornhub-embed.ts');



function getQueryVariable(url: string, key: string) {
	const query = url.split('?');
	if (query.length === 0) {
		return '';
	}
	const vars = query[1].split('&');
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == key) {
			return decodeURIComponent(pair[1]);
		}
	}
	console.log('Query variable %s not found', key);
	return '';
}



function initPhEmbed() {
	console.log('initPhEmbed');


	const player = document.getElementById('player');
	console.log('player:', player);

	const videoElements = document.querySelectorAll('video');
	// console.log('videoElements:', videoElements);
	if (videoElements.length < 1) {
		console.error('Could not found video player element!');
		return;
	}
	console.log('location:', location);
	const videoPlayer = videoElements[0];
	// console.log('videoPlayer:', videoPlayer);
	// document.body.innerHTML = ""; //remove everything


	const playButtons = document.getElementsByClassName('mgp_play');
	// console.log('playButtons:', playButtons);
	for (let index = 0; index < playButtons.length; index++) {
		const playbutton = playButtons[index];
		playbutton.addEventListener('click', event => {
			console.log('Clicked play');
			const videoElements = document.querySelectorAll('video');
			console.log('videoElements:', videoElements);
			if (videoElements.length > 0) {
				const videoPlayer = videoElements[0];
				console.log('videoPlayer:', videoPlayer);
				setVideoPlayer(videoPlayer, bridge);
			}
		})

	}


	const title = document.title;
	// console.log('title:', title);

	const head = document.head || document.getElementsByTagName('head')[0]; //Browser compatebility (needed?)
	const links = head.getElementsByTagName('link');
	let videoUrl = '';
	for (let index = 0; index < links.length; index++) {
		const link = links[index];
		const url = link.getAttribute('href');
		// console.log('link:', link, url);
		if (link.getAttribute('rel') === 'canonical' && url !== null) {
			// console.log('rel===canonical');
			videoUrl = url;
		}
	}
	if (videoUrl === '') {
		console.error('Failed to extract video url from PH embed element');
	} else {
		console.log('videoUrl:', videoUrl);
		let externalRef = getQueryVariable(videoUrl, 'viewkey');
		if (externalRef === null) externalRef = '';

		bridge.send('video.set', {
			platform: 'pornhub',
			partnerId: PARTNERID,
			externalRef: externalRef,
			url: videoUrl,
			title: title
		});
	}
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log('onMessage', message);
	if (message.action === 'refresh') {
		initPhEmbed()
	}
	sendResponse();
	return true;
});

export default bexContent((_bridge) => {
	bridge = _bridge;
	bridge.send('log', {
		message: 'pornhub-embed.ts loaded'
	})

	//DOES NOT WORK!
	// bridge.on('video.refresh', videoRefresh)
	// bridge.off('video.refresh', videoRefresh)

	//NEED to load it manually since the tab-complete event will happen before the content script is injected.
	console.log("window.location.toString().includes('/embed/')", window.location.toString().includes('/embed/'), window.location.toString());

	if (window.location.toString().includes('/embed/')) {
		//The refresh message works ok on pornhub directly
		initPhEmbed();
	}

})
