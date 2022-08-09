<template>
    <!-- <div class="q-ml-md q-mr-md rounded-borders" style="height: 400px; width: 300px;overflow-y: auto;overflow-x: clip"> -->
    <div class="q-ml-md q-mr-md rounded-borders" style="height: 400px; width: 300px;">
        <div class="text-center full-width q-mt-sm q-mb-sm">
            <div id="handy-ui"></div>
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
                    <q-avatar color="primary" text-color="black" icon="movie" />
                </q-item-section>

                <q-item-section v-if="videoData.title !== ''">
                    <q-item-label>{{ videoData.title }}</q-item-label>
                    <q-item-label caption lines="2">
                        <a :href="videoData.url" target="_blank">{{ videoData.url }}</a>
                    </q-item-label>
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
                    <!-- <q-avatar color="primary" text-color="black" icon="article" /> -->
                    <q-avatar @click="downloadToken()" color="primary" text-color="black" icon="download">
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

            </q-item>
            <q-item v-else>
                <q-item-section top avatar>
                    <q-avatar color="primary" text-color="black" icon="article" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Script token</q-item-label>
                    <q-item-label caption lines="2">
                        No scripts found for this page/video. <a
                            :href="'mailto:alexander@sweettech.no?subject=Script request&body=Hi%0D%0A%0D%0AI would like you to script this.%0D%0A%0D%0A State data:%0D%0A' + JSON.stringify(state) + '%0D%0A%0D%0AVideo data:%0D%0A' + JSON.stringify(videoData)">
                            Request us to script it
                        </a>
                    </q-item-label>
                </q-item-section>

            </q-item>


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
    <div class="full-width text-center text-caption">Sweet tech AS - &copy;2022</div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar'
import * as HandySDK from '@ohdoki/handy-sdk';
import { BexState, VideoData } from 'src/components/models';



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
const videoData = ref<VideoData>({
    url: '',
    platform: '',
    title: ''
});


function downloadToken() {
    window.open(state.value.scriptTokenUrl, '_blank');
}

const onStateUpdate = ({ data, respond }) => {
    console.log('state.updated:', data);
    state.value = data;
    respond();
}

const onVideoDataUpdate = ({ data, respond }) => {
    console.log('video.updated:', data);
    videoData.value = data;
    respond();
}


onBeforeUnmount(() => {
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
        // videoData.value = {
        //     'platform': 'pornhub',
        //     'url': 'https://www.pornhub.com/view_video.php?viewkey=ph5b130705d40d9',
        //     'title': 'Remy&#039;s cock control - Pornhub.com'
        // }
    }


    const HANDY = HandySDK.init({
        UUI: {
            compact: false
        }
    });
    HANDY.attachUUI();

    // bexContent(async bridge => {
    //     const { data } = await bridge.send('some.event', { someKey: 'aValue' })
    //     console.log('Some response from the other side', data)
    // })
});
</script>

<style scoped>
</style>