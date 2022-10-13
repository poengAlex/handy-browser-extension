/**
 * Script spesific for https://site-ma.brazzers.com/
 *
 *
 * Example of a scripted video: https://site-ma.brazzers.com/scene/3853561/blacklight-booty
 *
 */



import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { setVideoPlayer } from './assets/player';
const PARTNERID = 'brazzers.com';
let bridge: BexBridge;
console.log('Starting brazzers.ts');

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
  //Example of the external ref is "3853561" from the url https://site-ma.brazzers.com/scene/3853561/blacklight-booty
  const refReg = videoUrl.match(RegExp(/(\d+)/, 'i'));
  console.log('refReg:', refReg);
  let externalRef = '';
  if (refReg !== null && refReg?.length > 1) {
    externalRef = refReg[1];
  }
  console.log('externalRef:', externalRef);


  bridge.send('video.set', {
    platform: 'brazzers',
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
    message: 'brazzers.ts loaded'
  })
})
