<template>
  <div class="q-ml-md q-mr-md rounded-borders hide-scrollbar"
    style="height: 400px; width: 300px;overflow-y: auto;overflow-x: hidden;">
    <div class="text-center full-width q-mt-sm q-mb-sm">
      <!-- <div id="handy-ui"></div> -->
      <div v-if="connecting">
        <q-spinner></q-spinner>
        Trying to connect
      </div>

      <template v-else>
        <template v-if="connected">
          Connected - key: {{ connectionKey }}
          <br>
          <q-btn flat @click="disconnect()" color="primary">Disconnect</q-btn>
          <q-btn flat @click="resync()" :loading="syncing" color="primary">Resync</q-btn>
        </template>
        <template v-else>
          <q-input class="q-pl-sm q-pr-sm" label="Connection Key" v-model="connectionKey" @keydown.enter="connect(); ">
          </q-input>
          <div v-if="connectionKey.length !== 0 && connectionKey.length < 5" class="text-caption text-warning">Minimum 5
            chars
          </div>
          <div v-if="keyOnConnected === connectionKey" class="text-caption text-negative">Handy not connected</div>
          <q-btn flat @click="connect" :disable="connectionKey.length < 5" color="primary">Connect</q-btn>
        </template>
      </template>
    </div>

    <q-list padding>
      <q-item v-if="state.settingScript">
        <q-item-section top avatar>
          <q-spinner size="lg"></q-spinner>
        </q-item-section>
        <q-item-section>
          <q-item-label>Setting script...</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator v-if="state.settingScript" spaced inset="item" />

      <q-item>
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="movie" />
        </q-item-section>

        <q-item-section v-if="videoData.title !== ''">
          <q-item-label>{{ videoData.title }}</q-item-label>
          <q-item-label caption>Partner id: {{ videoData.partnerId }}</q-item-label>
          <q-item-label caption>External ref: {{ videoData.externalRef }}</q-item-label>
          <!-- <q-item-label caption lines="2">
            <a :href="videoData.url" target="_blank">{{ videoData.url }}</a>
          </q-item-label> -->
        </q-item-section>
        <q-item-section v-else>
          <q-item-label></q-item-label>
          <q-item-label caption lines="2">
            Could not extract video information
          </q-item-label>
        </q-item-section>


        <q-item-section side top>
          <q-item-label caption>{{ videoData.platform }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item v-if="state.scriptTokenUrl !== ''">
        <q-item-section top avatar>
          <q-avatar class="cursor-pointer" @click="downloadToken()" color="primary" text-color="white" icon="download">
            <q-tooltip>Download the script token</q-tooltip>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Script token<span v-if="scriptTokens.length > 1">s</span></q-item-label>
          <q-item-label caption lines="2">
            <span v-if="state.scriptSet">Script found and set on your machine.</span>
            <span v-else-if="state.settingScript">Script found. Setting it on your device.</span>
            <span v-else>Script found, but not set on your device</span>
          </q-item-label>
        </q-item-section>
        <q-item-section side top v-if="state.scriptSet">
          <q-icon class="cursor-pointer" name="refresh" @click="refreshScript"></q-icon>
          <q-tooltip>
            Set the script once more on your Handy. Click here if the video is not playing the script
            correctly.
          </q-tooltip>
        </q-item-section>
      </q-item>
      <q-item v-else>
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="article" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Script token</q-item-label>
          <q-item-label caption lines="2">
            No scripts found for this page/video.
            <q-btn v-if="videoData.url !== undefined && videoData.url !== ''" class="q-mt-sm"
              @click="requestVideoToBeScripted" color="primary">Request
              us to
              script it</q-btn>
            <q-btn v-else class="q-mt-sm" href="https://www.ivdb.io/#/request" target="_blank" color="primary">Add a
              request on ivdb.io
            </q-btn>
            <!-- <a
              :href="'mailto:alexander@sweettech.no?subject=Script request&body=Hi%0D%0A%0D%0AI would like you to script this.%0D%0A%0D%0A URL: [REPLACE WITH THE URL OF THE VIDEO]%0D%0A%0D%0A State data:%0D%0A' + JSON.stringify(state) + '%0D%0A%0D%0AVideo data:%0D%0A' + JSON.stringify(videoData)">
              Request us to script it
            </a> -->
          </q-item-label>
        </q-item-section>

      </q-item>

      <template v-if="state.partnerVideo !== undefined && false">
        <q-separator spaced inset="item" />
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="info" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Database data</q-item-label>
            <q-item-label caption v-for="(value, key) in state.partnerVideo" :key="key"><b>{{ key }}: </b>{{
                value
            }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>






    </q-list>

    <div v-if="false">
      State:
      <br>
      {{ state }}
      <br>
      Video:
      <br>
      {{ videoData }}
    </div>


  </div>
  <div class="full-width text-center text-caption">BETA version - Sweet tech AS - &copy;2022</div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar'
import * as HandySDK from '@ohdoki/handy-sdk';
import { BexState, VideoData } from 'src/components/models';
import { Handy } from '@ohdoki/handy-sdk/dist/handy';
import { initApi, apiIndex } from '../logic/api-wrapper'
import { createNotify, createNotifySuccess } from '../logic/utils'


let handy: Handy;



//TODO: do the actual refresh set on Handy
function refreshScript() {
  $q.bex.send('handy.refresh.script');
}

const state = ref<BexState>({
  settingScript: false,
  searchingForScript: false,
  scriptFound: false,
  scriptTokenUrl: '',
  tabUrl: '',
  scriptSet: false,
})

const scriptTokens = ref([]);
const $q = useQuasar();
const connectionKey = ref('');
const connected = ref(false);
const connecting = ref(true);
const keyOnConnected = ref('-1');
const syncing = ref(false);

const videoData = ref<VideoData>({
  externalRef: '',
  partnerId: '',
  url: '',
  platform: '',
  title: ''
});

async function connect() {
  connecting.value = true;
  try {
    keyOnConnected.value = connectionKey.value;
    const connected = await handy.connect(connectionKey.value)
    debugConsole('connected: ' + connected);

    const key = await handy.getStoredKey();
    if ($q.bex) {
      if (key === undefined) {
        $q.bex.send('log', {
          message: '(popup): Key is undefined'
        })
      } else {
        $q.bex.send('handy.connected', key); //Set the key in background and refresh the page
      }

    }

  } catch (err) { console.error(err) }
  connecting.value = false;
}

async function disconnect() {
  handy.disconnect();
  keyOnConnected.value = '-1';
}
async function resync() {
  syncing.value = true;
  try {
    const res = await handy.sync();
    createNotifySuccess('Synced successfully')
  } catch (err) {
    console.error(err);
    createNotify(err as string)
  }
  syncing.value = false;
}

function debugConsole(msg: string) {
  if ($q.bex) {
    $q.bex.send('log', {
      message: '[popup]: ' + msg
    });
  } else {
    console.log('debugLog. msg:', msg);
  }


}

async function requestVideoToBeScripted() {
  if (connectionKey.value === undefined || connectionKey.value === '') {
    createNotify('Please connect your Handy')
  }
  //REmoved since its cumbersome to wait for connection everytime you want to add a request
  // else if (!connected.value) {
  //   createNotify('Please connect your Handy')
  // }
  else {
    initApi(connectionKey.value);
    try {
      const res = await apiIndex.videoRequests.createVideoRequest({
        // url: state.value.tabUrl
        url: videoData.value.url
      })
      debugConsole('res: ' + res)

      createNotifySuccess('Request sent')
    } catch (err) {
      console.error(err);
      createNotify(err as string)
    }

  }

}

function downloadToken() {
  window.open(state.value.scriptTokenUrl, '_blank');
}

const onStateUpdate = ({ data, respond }: { data: BexState, respond: () => void }) => {
  console.log('state.updated:', data);
  state.value = data
  respond();
}

const onVideoDataUpdate = ({ data, respond }: { data: VideoData, respond: () => void }) => {
  console.log('video.updated:', data);
  videoData.value = data;
  respond();
}



onBeforeUnmount(() => {
  console.log('$q.bex:', $q.bex);

  if ($q.bex) {
    $q.bex.off('state.updated', onStateUpdate);
    $q.bex.off('video.updated', onVideoDataUpdate);
  }
})

onMounted(async () => {
  console.log('onMounted - popup page');
  const handyStates = localStorage.getItem('handyStates');

  if (handyStates !== null) {
    try {
      let data = JSON.parse(handyStates);
      if (data.length > 0 && data[0].connectionKey) {
        connectionKey.value = data[0].connectionKey;
      }
    } catch (err) {
      if ($q.bex) {
        $q.bex.send('log', {
          message: '(popup): Could not get Handy states'
        })
      }
    }

  }


  console.log('$q.bex:', $q.bex);

  if ($q.bex) {
    $q.bex.send('log', {
      message: 'Msg from popup page: onmounted'
    });


    $q.bex.on('video.updated', onVideoDataUpdate)
    $q.bex.on('state.updated', onStateUpdate)

    state.value = (await $q.bex.send('state.get')).data;
    videoData.value = (await $q.bex.send('video.get')).data;

  } else {
    //DEBUG DATA
    videoData.value = {
      externalRef: '',
      partnerId: '',
      'platform': 'pornhub',
      'url': 'https://www.pornhub.com/view_video.php?viewkey=ph5b130705d40d9',
      'title': 'Remy&#039;s cock control - Pornhub.com'
    }
  }



  //TODO: Add UUI when bugs are fixed
  handy = HandySDK.init({
  });

  // handy.attachUUI();

  handy.on('connect', () => {
    console.log('connected');
    connected.value = true;
    $q.bex.send('log', {
      message: '[popup]: Handy connected'
    });

  })

  handy.on('disconnect', () => {
    console.log('disconnect');
    connected.value = false;
  })

  const key = await handy.getStoredKey()
  if (key !== undefined) {
    connectionKey.value = key;
    try {
      await handy.connect(key);
    } catch (err) { console.error(err) }
    connecting.value = false;

  } else {
    connecting.value = false;
  }
});
</script>

<style scoped>

</style>
