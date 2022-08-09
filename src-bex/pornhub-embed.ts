/**
 * Script spesific for pornhub embed
 * - this should only be loaded on embeded iframes not pornhub it self
 * 
 * Test script: https://sweettecheu.s3.eu-central-1.amazonaws.com/test/ph5b130705d40d9.funscript
 * https://sweettecheu.s3.eu-central-1.amazonaws.com/test/ph5b130705d40d9.csv
 */

import { BexBridge } from '@quasar/app-vite';
import { bexContent } from 'quasar/wrappers'
import { setVideoPlayer } from './assets/player';
let bridge: BexBridge;
console.log('Starting pornhub-embed.ts');

function initPhEmbed() {
    console.log('initPhEmbed');


    const player = document.getElementById('player');
    console.log('player:', player);

    const videoElements = document.querySelectorAll('video');
    // console.log('videoElements:', videoElements);
    if (videoElements.length < 1) {
        console.error('Could not found video player element!');
        return;
    }
    const videoPlayer = videoElements[0];
    // console.log('videoPlayer:', videoPlayer);
    // document.body.innerHTML = ""; //remove everything


    const playButtons = document.getElementsByClassName('mgp_play');
    // console.log('playButtons:', playButtons);
    for (let index = 0; index < playButtons.length; index++) {
        const playbutton = playButtons[index];
        playbutton.addEventListener('click', event => {
            console.log('Clicked play');
            const videoElements = document.querySelectorAll('video');
            console.log('videoElements:', videoElements);
            if (videoElements.length > 0) {
                const videoPlayer = videoElements[0];
                console.log('videoPlayer:', videoPlayer);
                setVideoPlayer(videoPlayer, bridge);
            }
        })

    }

    //No need to add this? Already have player events
    // const pauseButton = document.getElementsByClassName('mgp_pause');
    // console.log('pauseButton:', pauseButton);

    const title = document.title;
    // console.log('title:', title);

    const head = document.head || document.getElementsByTagName('head')[0]; //Browser compatebility (needed?)
    const links = head.getElementsByTagName('link');
    let videoUrl = '';
    for (let index = 0; index < links.length; index++) {
        const link = links[index];
        const url = link.getAttribute('href');
        // console.log('link:', link, url);
        if (link.getAttribute('rel') === 'canonical' && url !== null) {
            // console.log('rel===canonical');
            videoUrl = url;
        }
    }
    if (videoUrl === '') {
        console.error('Failed to extract video url from PH embed element');
    } else {
        console.log('videoUrl:', videoUrl);
        bridge.send('video.set', {
            platform: 'pornhub',
            url: videoUrl,
            title: title
        });
    }
}


const videoRefresh = ({ data, respond }) => {
    console.log('(ph)video.refresh:', data);
    respond('ok');
    initPhEmbed();

}

export default bexContent((_bridge) => {
    bridge = _bridge;
    bridge.send('log', {
        message: 'pornhub-embed.ts loaded'
    })


    bridge.on('highlight.content', ({ data, respond }) => {
        console.warn('highlight.content');

        const el = document.querySelector(data.selector)
        if (el !== null) {
            el.classList.add('bex-highlight')
        }

        // Let's resolve the `send()` call's promise, this way we can await it on the other side then display a notification. 
        respond()
    })

    //DOES NOT WORK!
    bridge.on('video.refresh', videoRefresh)
    bridge.off('video.refresh', videoRefresh)

    initPhEmbed();

})