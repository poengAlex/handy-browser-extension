
import { BexBridge } from '@quasar/app-vite';
let duration = 30; //video must be longer than 30sec
let playerSet: HTMLVideoElement
let bridge: BexBridge;


export function findAndSetVideoPlayer(bridgeIn: BexBridge) {
  console.log('findAndSetVideoPlayer()');

  bridge = bridgeIn;
  checkForPlayer();
  setInterval(() => {
    checkForPlayer();
  }, 1000);
}

function checkForPlayer() {
  const videoElements = document.querySelectorAll('video');
  // console.log('videoElements:', videoElements);
  for (let i = 0; i < videoElements.length; i++) {
    const videoElement = videoElements[i];
    // console.log('videoElement:', videoElement);
    // console.log('duration:', videoElement.duration);
    if (videoElement.duration > duration) {
      setVideoPlayer(videoElement);
    }
  }
}


function onPlaying() {
  console.log('onPlaying', playerSet.currentTime);
  bridge.send('videoplayer.playing', { currentTime: Math.round(playerSet.currentTime * 1000) })
}

function onPaused() {
  console.log('onPause');
  bridge.send('videoplayer.paused');
}

function setVideoPlayer(player: HTMLVideoElement) {
  console.log('Setting video player: ', player);
  duration = player.duration;

  if (playerSet !== undefined) {
    console.warn('Video player changed during loading. Unknown behavior. Removing old listeners and setting new.');
    playerSet.removeEventListener('playing', onPlaying);
    playerSet.removeEventListener('pause', onPaused);
  }
  playerSet = player;

  if (!player.paused) {
    console.log('Player is playing');
    setTimeout(() => { //Give time to search for script
      bridge.send('videoplayer.playing', { currentTime: Math.round(player.currentTime * 1000) })
    }, 1000);

  }

  player.addEventListener('playing', onPlaying);
  player.addEventListener('pause', onPaused);
}
