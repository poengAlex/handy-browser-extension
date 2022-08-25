/**
 * Handy assets
 */

import * as HandySDK from '@ohdoki/handy-sdk';

export const handy = HandySDK.init();
let connected = false;
let playStartTime = 0;

export async function connectHandy(key: string | undefined = undefined) {
  console.log('connectHandy');

  let connectionKey = handy.getStoredKey();
  if (key !== undefined) {
    connectionKey = key;
  }
  if (connectionKey !== undefined) {
    try {
      const connectRes = await handy.connect(connectionKey);
      console.log('connectRes:', connectRes);
      if (connectRes === 1) {
        connected = true;
      } else {
        connected = false;
      }
    } catch (error) {
      connected = false;
    }

  }

  return connected
}

export async function setScript(url: string) {
  console.log('setScript', url);
  if (!connected) await connectHandy();
  try {
    const resSetScript = await handy.setScript(url);
    console.log('resSetScript:', resSetScript);
    if (playStartTime !== 0) { //video was playing
      hsspPlay(Date.now() - playStartTime);
    }

  } catch (err) {
    throw (err)
  }
}

export async function hsspPlay(currentTime: number) {
  console.log('hsspPlay', currentTime);
  const state = handy.getState();
  console.log('state:', state);
  if (state.settingScript) {
    playStartTime = Date.now() - currentTime;
  } else {
    playStartTime = 0;
    const resHsspPlay = await handy.hsspPlay(currentTime);
    console.log('resHsspPlay:', resHsspPlay);
  }
}

export async function hsspPause() {
  console.log('hsspPause');
  const state = handy.getState();
  console.log('state:', state);
  playStartTime = 0;
  const resHsspPause = await handy.hsspStop();
  console.log('resHsspPause:', resHsspPause);
}

