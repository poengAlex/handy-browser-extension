import { bexBackground } from 'quasar/wrappers';
import { connectHandy, hsspPause, hsspPlay, setScript } from './assets/handy'
import { BexBridge } from '@quasar/app-vite';





const sendingRefresh = false;
let bridge: BexBridge;

console.log('Starting background.ts');
connectHandy();

/**
 * TODO:
 * clear video data on tab change
 * retrigger parsing on tab change -> set video data
 */

type VideoData = {
  platform: string,
  title: string,
  url: string
}

const DEFAULT_VIDEO_DATA: VideoData = {
  platform: '',
  title: '',
  url: ''
}

let videoData: VideoData = DEFAULT_VIDEO_DATA;

type BexStatePart = {
  settingScript?: boolean,
  searchingForScript?: boolean,
  scriptFound?: boolean,
  scriptTokenUrl?: string,
  tabUrl?: string,
  tabChangeDetected?: boolean
}

type BexState = {
  settingScript: boolean,
  searchingForScript: boolean,
  scriptFound: boolean,
  scriptTokenUrl: string,
  tabUrl: string,
  tabChangeDetected: boolean
}

const DEFAULT_BEX_STATE: BexState = {
  settingScript: false,
  searchingForScript: false,
  scriptFound: false,
  scriptTokenUrl: '',
  tabUrl: '',
  tabChangeDetected: false,
}

let bexState: BexState = DEFAULT_BEX_STATE;


declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];


    'video.set': [VideoData, never]
    'video.get': [never, VideoData]
    'video.update': [never, VideoData] //when the video data is changed
    'video.refresh': [any, any] //when the video data is changed

    'videoplayer.playing': [{ currentTime: number }, never]
    'videoplayer.paused': [never, never]

    'state.update': [never, BexState] //when the bex data is changed
    'state.get': [never, BexState] //when the bex data is changed

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

async function restart() {
  chrome.browserAction.setBadgeText({ text: '' });
  updateState({
    tabChangeDetected: true
  })
  // videoData = DEFAULT_VIDEO_DATA;

  // updateState(DEFAULT_BEX_STATE)
  // if (!sendingRefresh) {
  //   sendingRefresh = true;
  //   console.log('video.refresh - STARTED');

  //   // refreshData(bridge);
  //   if (bridge !== undefined) {
  //     const res = await bridge.send('video.refresh');
  //     console.log('res:', res);
  //   }


  //   console.log('video.refresh - FINISHED');
  //   sendingRefresh = false;
  // }
}

// Send a message to the client based on something happening.
chrome.tabs.onCreated.addListener(tab => {
  console.log('tabs.onCreated.addListener', tab);
  // bridge.send('video.refresh');
  // bridge.send('browserTabCreated', { tab })
})

chrome.tabs.onActivated.addListener(activeInfo => {
  console.log('tabs.onActivated. activeInfo:', activeInfo);
  restart();
  // if (bridge !== undefined) bridge.send('video.refresh');

})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.warn('tabs.onUpdated.addListener', tabId, changeInfo, tab);
  if (changeInfo.status === 'complete') {
    //TRIGGER script refresh!

    // restart();

  }
  // bridge.send('browserTabCreated', { tab })
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

  bridge.on('video.set', ({ data, respond }) => {
    console.log('Setting video data', data);
    videoData = data;
    respond();

    bridge.send('video.updated', videoData);

    updateState({
      searchingForScript: true,
      tabChangeDetected: false
    })


    setTimeout(async () => { //DEBUG -> Check for the actual script through the API
      chrome.browserAction.setBadgeText({ text: 'script' })
      chrome.browserAction.setBadgeBackgroundColor({ color: 'orange' });
      updateState({
        searchingForScript: true,
        settingScript: true,
        scriptFound: true,
        scriptTokenUrl: 'https://sweettecheu.s3.eu-central-1.amazonaws.com/test/ph5b130705d40d9.csv'
      })
      try {
        await setScript(bexState.scriptTokenUrl);
        // bridge.send('video.updated', videoData);
        bridge.send('showNotification', { text: 'script set', type: 'success' });
        updateState({
          settingScript: false,
        })
          ;
        // chrome.browserAction.setIcon({ path: '/icons/baseline_done_black_24dp.png' });

        chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
      } catch (err) {
        console.error(err);
        bridge.send('showNotification', { text: 'Failed to set script. ERR: ' + err, type: 'error' });
      }


      console.log('script set complete');

    }, 500);
  });

  bridge.on('state.get', ({ respond }) => {
    console.log('state.get');
    respond(bexState);
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
