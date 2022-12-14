/**
 * Handy logic file
 */

import * as HandySDK from '@ohdoki/handy-sdk';
// import * as HandySDK from '../../../handy-js/dist/handy.esm'


//TODO: Need function inside the SDK.
// const window = {
//   localStorage: {}
// }

// // @ts-ignore
// window.localStorage.getItem = async (key: string) => {
//   console.warn('PIPED storage command');
//   return (await chrome.storage.sync.get([key]))[key];
// }

export const handy = HandySDK.init({
  localStorage: {
    getItem: (key: string) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (item) => {
          if (item && typeof item === 'string') {
            resolve(item)
          } else {
            reject(item)
          }
        });
      });
    },
    setItem: (key: string, value: string) => {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => {
          resolve();
        });
      });
    },
    removeItem: (key: string) => {
      return new Promise((resolve) => {
        chrome.storage.local.remove([key], () => {
          resolve();
        });
      });
    }
  }
});
let connected = false;
let playStartTime = 0;

export async function connectHandy(key: string | undefined = undefined) {
  console.log('connectHandy', key);


  const { connectionKey } = await chrome.storage.sync.get(['connectionKey'])
  // let connectionKey = handy.getStoredKey();
  // if (key !== undefined) {
  //   connectionKey = key;
  // }
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
  let resSetScript;
  if (!connected) await connectHandy();
  try {
    resSetScript = await handy.setScript(url);
    console.log('resSetScript:', resSetScript);
    if (playStartTime !== 0) { //video was playing
      hsspPlay(Date.now() - playStartTime);
    }

  } catch (err) {
    console.error(err);

    throw ((err as any).message)
  }
  return resSetScript
}

export async function hsspPlay(currentTime: number) {
  console.log('hsspPlay', currentTime);
  const state = handy.getState();
  console.log('state:', state);
  if (state.settingScript) {
    playStartTime = Date.now() - currentTime; //store the playtime and set it when script is set complete
  } else {
    playStartTime = 0;
    try {
      const resHsspPlay = await handy.hsspPlay(currentTime);
      console.log('resHsspPlay:', resHsspPlay);
    } catch (err) { console.error(err) }


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

