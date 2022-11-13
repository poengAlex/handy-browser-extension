/**
 * Script spesific for https://thebenefitmonkey.com
 *
 *
 * Example of a scripted video: https://thebenefitmonkey.com/members/scenes/Anna-Khara-Vs-The-Hungrylla_vids.html
 *
 */



import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { findAndSetVideoPlayer } from './assets/player_extractor';

let bridge: BexBridge;
console.log('Starting benefit-monkey.ts');


function initContentScript() {
  console.log('initContentScript');


  findAndSetVideoPlayer(bridge);

  const title = document.title;
  console.log('title:', title);

  const videoUrl = location.href;

  //Extract the ref from the video url
  //Example of the external ref is Anna-Khara-Vs-The-Hungrylla_vids from the url https://thebenefitmonkey.com/members/scenes/Anna-Khara-Vs-The-Hungrylla_vids.html
  const refReg = videoUrl.match(RegExp('^.*\/scenes\/(.*)\.html$', 'i'));
  console.log('refReg:', refReg);
  let externalRef = '';
  if (refReg !== null && refReg?.length > 1) {
    externalRef = refReg[1];
  }
  console.log('externalRef:', externalRef);


  bridge.send('video.set', {
    platform: 'benefit-monkey',
    partnerId: 'thebenefitmonkey.com',
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
    message: 'benefit-monkey.ts loaded'
  })
})
