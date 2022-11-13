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
let lastTitle: string | undefined;
console.log('Starting youtube.ts');

function initContentScript(refresh = false) {
  console.log('initContentScript');


  findAndSetVideoPlayer(bridge);


  lastTitle = document.title;
  console.log('title:', lastTitle);

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
    title: lastTitle
  });


  //Set a title observer to refresh if the user navigates between videos without a refresh
  if (!refresh) {
    // select the target node
    const target = document.querySelector('title');
    if (target !== null) {
      // create an observer instance
      const observer = new MutationObserver(function (mutations) {
        // We need only first event and only new value of the title
        const title = mutations[0].target.nodeValue;
        console.log('TITLE CHANGE', title);
        if (title !== null && title !== lastTitle) {
          console.log('Title update setting data again');
          lastTitle = title;
          initContentScript(true);
        }
      });

      // configuration of the observer:
      const config = { subtree: true, characterData: true, childList: true };

      // pass in the target node, as well as the observer options
      observer.observe(target, config);
    }

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
    message: 'youtube.ts loaded'
  })
})
