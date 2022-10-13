/**
 * Script spesific for https://www.youtube.com/watch*
 *
 *
 * Example of a scripted video: https://www.youtube.com/watch?v=aNFVpmfJLNs
 *
 */



import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { setVideoPlayer } from './assets/player';
// const PARTNERID = 'youtube.com';
const PARTNERID = 'brazzers.com';
let bridge: BexBridge;
console.log('Starting youtube.ts');

function checkForVideoPlayer() {
  const videoElements = document.querySelectorAll('video');
  console.log('videoElements:', videoElements);
  if (videoElements.length < 1) {
    console.warn('Could not found video player element! -waiting 1000ms to check again');
    setTimeout(() => {
      checkForVideoPlayer();
    }, 1000);
    return;
  }
  console.log('location:', location);
  const videoPlayer = videoElements[0];
  setVideoPlayer(videoPlayer, bridge);
}

function initContentScript() {
  console.log('initContentScript');


  checkForVideoPlayer();


  const title = document.title;
  console.log('title:', title);

  const videoUrl = location.href;

  //Extract the ref from the video url
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  let externalRef = urlParams.get('v');
  externalRef = '3853561';
  console.log('externalRef:', externalRef);


  bridge.send('video.set', {
    platform: 'youtube',
    partnerId: PARTNERID,
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
