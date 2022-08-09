/**
 * This script handles all the video player events
 */

import { BexBridge } from '@quasar/app-vite';

let playerSet = false;

export function setVideoPlayer(player: HTMLVideoElement, bridge: BexBridge) {
    console.log('setVideoPlayer', player);
    if (!playerSet) {
        if (!player.paused) {
            bridge.send('video.playing', { currentTime: Math.round(player.currentTime * 1000) })
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