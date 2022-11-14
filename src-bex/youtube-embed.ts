/**
 * Script specific for Youtube embeded files https://www.youtube.com/embed/*
 *
 *
 * Example of a scripted video: https://www.youtube.com/embed/aNFVpmfJLNs
 *
 */



import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { findAndSetVideoPlayer } from './assets/player_extractor';
import { getQueryVariable } from './assets/utils';

let bridge: BexBridge;
let lastTitle: string | undefined;
console.log('Starting youtube-embed.ts');

function initContentScript(refresh = false) {
  console.log('initContentScript');

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
      console.log('rel===canonical');
      videoUrl = url;
    }
  }
  if (videoUrl === '') {
    console.error('Failed to extract video url from youtube embed element');
  } else {
    console.log('videoUrl:', videoUrl);
    let externalRef = getQueryVariable(videoUrl, 'v');
    if (externalRef === null || externalRef === '') externalRef = 'UNKNOWN';
    console.log('externalRef:', externalRef);


    bridge.send('video.set', {
      platform: 'youtube',
      partnerId: 'youtube.com',
      externalRef: externalRef,
      url: videoUrl,
      title: title
    });
  }

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
    message: 'youtube-embed.ts loaded'
  })
  initContentScript();
  // if (window) {
  //   //NEED to load it manually since the tab-complete event will happen before the content script is injected.
  //   console.log("window.location.toString().includes('/embed/')", window.location.toString().includes('/embed/'), window.location.toString());

  //   if (window.location.toString().includes('/embed/')) {
  //     //The refresh message works ok on pornhub directly
  //     initContentScript();
  //   }
  // }
})
