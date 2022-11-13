/**
 * This script handles all the video player events
 *
 * @deprecated: Use player_extractor
 */

import { BexBridge } from '@quasar/app-vite';

let playerSet = false;

/**
 * @deprecated: Use player_extractor
 * @param player
 * @param bridge
 */
export function setVideoPlayer(player: HTMLVideoElement, bridge: BexBridge) {
  console.log('setVideoPlayer', player);
  // player.controls = true; //Add this to the settings.
  // // player.controlsList = null; //Not supported in FF
  // player.style.zIndex = '2147483647';
  console.log('player.paused:', player.paused);


  if (!playerSet) {
    if (!player.paused) {
      console.log('Player is playing');
      setTimeout(() => { //Give time to search for script
        bridge.send('videoplayer.playing', { currentTime: Math.round(player.currentTime * 1000) })
      }, 1000);

    }

    player.addEventListener('playing', event => {
      console.log('onPlaying', player.currentTime);
      bridge.send('videoplayer.playing', { currentTime: Math.round(player.currentTime * 1000) })
      // console.log('videoPlayer:', player, player.src);
      // document.body.innerHTML = `<video src="${videoPlayer.src}" height="200" width="100"></video>`; //not possible -> Blob is read once!
    });
    player.addEventListener('pause', event => {
      console.log('onPause');
      bridge.send('videoplayer.paused');
    });
    playerSet = true;
  } else {
    console.warn('Player is already set!');

  }

}
