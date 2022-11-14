/**
 * Script specific for pornhub site and pornhub embed videos
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
import { findAndSetVideoPlayer } from './assets/player_extractor';
import { getQueryVariable } from './assets/utils';

let bridge: BexBridge;
console.log('Starting pornhub-embed.ts');

function initPhEmbed() {
  console.log('initPhEmbed');

  findAndSetVideoPlayer(bridge);
  const title = document.title;
  const head = document.head || document.getElementsByTagName('head')[0]; //Browser compatibility (needed?)
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
    if (externalRef === null || externalRef === '') externalRef = 'UNKNOWN';

    bridge.send('video.set', {
      platform: 'pornhub',
      partnerId: 'pornhub.com',
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

  if (window) {
    //NEED to load it manually since the tab-complete event will happen before the content script is injected.
    console.log("window.location.toString().includes('/embed/')", window.location.toString().includes('/embed/'), window.location.toString());

    if (window.location.toString().includes('/embed/')) {
      //The refresh message works ok on pornhub directly
      initPhEmbed();
    }
  }


})
