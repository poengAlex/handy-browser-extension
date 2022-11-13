/**
 * Script spesific for https://www.youtube.com/watch*
 *
 *
 * Example of a scripted video: https://www.youtube.com/watch?v=aNFVpmfJLNs
 *
 */



import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { findAndSetVideoPlayer } from './assets/player_extractor';

let bridge: BexBridge;
console.log('Starting youtube.ts');

function initContentScript() {
  console.log('initContentScript');


  findAndSetVideoPlayer(bridge);


  const title = document.title;
  console.log('title:', title);

  const videoUrl = location.href;

  //Extract the ref from the video url
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  let externalRef = urlParams.get('v');
  // externalRef = '3853561';
  console.log('externalRef:', externalRef);
  if (externalRef === null) {
    externalRef = 'null';
  }


  bridge.send('video.set', {
    platform: 'youtube',
    partnerId: 'youtube.com',
    externalRef: externalRef,
    url: videoUrl,
    title: title
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('onMessage', message);
  if (message.action === 'refresh') {
    initContentScript()
  }
  sendResponse();
  return true;
});

export default bexContent((_bridge) => {
  bridge = _bridge;
  bridge.send('log', {
    message: 'youtube.ts loaded'
  })
})
