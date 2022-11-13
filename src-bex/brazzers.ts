/**
 * Script spesific for https://site-ma.brazzers.com/
 *
 *
 * Example of a scripted video: https://site-ma.brazzers.com/scene/3853561/blacklight-booty
 *
 */



import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { findAndSetVideoPlayer } from './assets/player_extractor';
let bridge: BexBridge;
console.log('Starting brazzers.ts');


function initContentScript() {
  console.log('initContentScript');


  findAndSetVideoPlayer(bridge);


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
    partnerId: 'brazzers.com',
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
