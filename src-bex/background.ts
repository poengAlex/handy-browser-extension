import { bexBackground } from 'quasar/wrappers';
import { connectHandy, hsspPause, hsspPlay, setScript } from './assets/handy'
import { BexBridge } from '@quasar/app-vite';
import { BexState, BexStatePart, VideoData } from 'src/components/models';
import { ScriptApiIndex } from 'app/SCRIPTAPIINDEX';


let bridge: BexBridge;

let settingScriptData = false;
console.log('Starting background.ts');
connectHandy();

/**
 * TODO:
 * clear video data on tab change
 * retrigger parsing on tab change -> set video data
 */


const DEFAULT_VIDEO_DATA: VideoData = {
  platform: '',
  partnerId: '',
  externalRef: '',
  title: '',
  url: ''
}

let videoData: VideoData = DEFAULT_VIDEO_DATA;




const DEFAULT_BEX_STATE: BexState = {
  scriptSet: false,
  settingScript: false,
  searchingForScript: false,
  scriptFound: false,
  scriptTokenUrl: '',
  tabUrl: '',
}

let bexState: BexState = DEFAULT_BEX_STATE;


function setBadge(color: string, text = 'script') {
  chrome.action.setBadgeBackgroundColor({ color: color });
  chrome.action.setBadgeText({ text: text })
}

/**
 * Sends a notify to notify.js content script that creates a notify popup
 * @param text
 * @param type
 */
function sendNotify(text: string, type: 'warning' | 'error' | 'success') {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log('tabs:', tabs);
    if (tabs.length > 0) {
      updateState({ tabUrl: tabs[0].url as string })
      chrome.tabs.sendMessage(tabs[0].id as number, { action: 'notify', text, type }, function (response) {
        console.log('sendMessage on tab change. response', response);
      });
    }
  });
}

declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];


    'video.set': [VideoData, never]
    'video.get': [never, VideoData]
    'video.update': [never, VideoData] //when the video data is changed

    'videoplayer.playing': [{ currentTime: number }, never]
    'videoplayer.paused': [never, never]

    'state.update': [never, BexState] //when the bex data is changed
    'state.get': [never, BexState] //when the bex data is changed

    'handy.connected': [string, never] //when handy is connected
    'handy.key': [never, string | undefined] //get the key
    'handy.refresh.script': [never, never] //Set the script once more

    'showNotification': [never, { text: string, type: 'warning' | 'error' | 'success' }] //when the video data is change

    'storage.get': [{ key: string | null }, any];
    'storage.set': [{ key: string; value: any }, any];
    'storage.remove': [{ key: string }, any];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

function updateState(newData: BexStatePart) {
  console.log('updateState', newData);
  bexState = {
    ...bexState,
    ...newData
  }
  if (bridge !== undefined) bridge.send('state.updated', bexState);
}

async function getTabUrl() {
  const queryOptions = { active: true, currentWindow: true };
  const tabs = await chrome.tabs.query(queryOptions);
  return tabs[0].url;
}

/**
 * Restart everything.
 * Usefull when the user changes tabs
 */
async function restart() {
  console.log('restart');

  chrome.action.setBadgeText({ text: '' });

  videoData = DEFAULT_VIDEO_DATA;
  updateState(DEFAULT_BEX_STATE)

  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    console.log('tabs:', tabs);
    if (tabs.length > 0) {
      const url = await getTabUrl();
      console.log('url:', url);

      updateState({ tabUrl: url })
      chrome.tabs.sendMessage(tabs[0].id as number, { action: 'refresh' }, function (response) {
        console.log('sendMessage on tab change. response', response);
      });
    }
  });

}

// Send a message to the client based on something happening.
// Not needed
// chrome.tabs.onCreated.addListener(tab => {
// 	console.log('tabs.onCreated.addListener', tab);
// })

chrome.tabs.onActivated.addListener(activeInfo => {
  console.log('tabs.onActivated. activeInfo:', activeInfo);
  restart();
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('tabs.onUpdated.addListener', tabId, changeInfo, tab);
  if (changeInfo.status === 'complete') {
    restart();
  }
})

export default bexBackground((_bridge, allActiveConnections) => {
  bridge = _bridge;
  bridge.on('log', ({ data, respond }) => {
    console.log('allActiveConnections:', allActiveConnections);

    console.log(`[BEX] ${data.message}`, ...(data.data || []));
    respond();
  });

  bridge.on('videoplayer.playing', ({ data, respond }) => {
    console.log('video.playing', data);
    hsspPlay(data.currentTime);
    respond();

  });
  bridge.on('videoplayer.paused', ({ respond }) => {
    console.log('video.paused');
    hsspPause();
    respond();
  });

  bridge.on('video.get', ({ respond }) => {
    console.log('video.get');
    respond(videoData);
  });


  bridge.on('video.set', async ({ data, respond }) => {

    console.log('Setting video data', data);
    if (settingScriptData) {
      console.warn('Already settings script data - Skipping');
      return;
    }
    settingScriptData = true;
    videoData = data;
    respond();

    bridge.send('video.updated', videoData);

    updateState({
      searchingForScript: true,
    })

    try {
      setBadge('black', '');

      updateState({
        searchingForScript: true,
        partnerVideo: undefined
        // scriptTokenUrl: 'https://sweettecheu.s3.eu-central-1.amazonaws.com/test/ph5b130705d40d9.csv'
      })
      // const key = handy.getStoredKey();
      const { connectionKey } = await chrome.storage.sync.get(['connectionKey'])
      console.log('key:', connectionKey);

      const apiIndex = new ScriptApiIndex({
        HEADERS: {
          Authorization: 'Bearer ' + connectionKey
        },
      });
      const partnerVideo = await apiIndex.index.lookup(videoData.externalRef, videoData.partnerId);
      console.log('Search complete. partnerVideo:', partnerVideo);
      if (partnerVideo === undefined) {
        sendNotify('No script found on this video', 'warning');
        setBadge('yellow');
      } else {
        setBadge('orange');
        const scripts = await apiIndex.index.getVideoScripts(partnerVideo.partnerVideoId);
        console.log('scripts:', scripts);
        if (connectionKey === undefined || connectionKey === '') {
          sendNotify('No connected Handy', 'warning');
        } else if (scripts.length > 0) {

          const script = scripts[0];
          const token = await apiIndex.index.getTokenUrl(partnerVideo.partnerVideoId, script.scriptId)
          console.log('token:', token);
          updateState({
            scriptFound: true,
            searchingForScript: false,
            partnerVideo: partnerVideo,
            settingScript: true,
            scriptTokenUrl: token.url
          })
          sendNotify('script found', 'success');
          const setScriptRes = await setScript(token.url as string);
          console.log('setScriptRes:', setScriptRes);
          sendNotify('script set', 'success');
          updateState({
            scriptSet: true,
          })
          setBadge('green');
        }
      }
    } catch (err) {
      console.error(err);
      setBadge('red');
      let errorString = err;
      if (typeof err === 'object') {
        errorString = JSON.stringify(err);
      }

      sendNotify('Failed to set script. Error: ' + errorString, 'error');

      console.log('script set complete');
    }
    updateState({
      settingScript: false,
    })
    settingScriptData = false;
  });

  bridge.on('state.get', ({ respond }) => {
    console.log('state.get');
    respond(bexState);
  });

  //Send from the popup when the Handy is connected -> Do this to update the state in background to match the popup
  bridge.on('handy.connected', async ({ data, respond }) => {
    const connectionKey = data;
    console.log('video.connected.connectionKey:', connectionKey);
    respond();
    chrome.storage.sync.set({ connectionKey: connectionKey }, function () {
      console.log('Value is set to ' + connectionKey);
    });
    try {
      await connectHandy(connectionKey);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log('tabs:', tabs);
        if (tabs.length > 0) {
          const currentTab = tabs[0];
          chrome.tabs.reload(currentTab.id as number);
        }

      });
    } catch (err) { console.error(err) }


  });

  bridge.on('handy.key', ({ respond }) => {

    chrome.storage.sync.get(['connectionKey'], function (result) {
      console.log('Value currently is ' + result.connectionKey);
      respond(result.connectionKey);
    });

  });

  //TODO: Add logic for this
  bridge.on('handy.refresh.script', ({ respond }) => {
    sendNotify('Not implemented yet - refresh the page instead', 'warning')
    respond();
  });


  bridge.on('getTime', ({ respond }) => {
    respond(Date.now());
  });

  bridge.on('storage.get', ({ data, respond }) => {
    const { key } = data;
    if (key === null) {
      chrome.storage.local.get(null, (items) => {
        // Group the values up into an array to take advantage of the bridge's chunk splitting.
        respond(Object.values(items));
      });
    } else {
      chrome.storage.local.get([key], (items) => {
        respond(items[key]);
      });
    }
  });
  // Usage:
  // const { data } = await bridge.send('storage.get', { key: 'someKey' })

  bridge.on('storage.set', ({ data, respond }) => {
    chrome.storage.local.set({ [data.key]: data.value }, () => {
      respond();
    });
  });
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })

  bridge.on('storage.remove', ({ data, respond }) => {
    chrome.storage.local.remove(data.key, () => {
      respond();
    });
  });
  // Usage:
  // await bridge.send('storage.remove', { key: 'someKey' })

  // EXAMPLES
  // Listen to a message from the client
  bridge.on('test', d => {
    console.log(d)
  })



  // Send a message to the client based on something happening.
  // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //   console.log('chrome.tabs.onUpdated', tabId, changeInfo, tab);

  //   if (changeInfo.url) {
  //     bridge.send('browserTabUpdated', { tab, changeInfo })
  //   }
  // });


});
