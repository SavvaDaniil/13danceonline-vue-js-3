<template>
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-16-9"></video>
</template>

<script>
import videojs from "video.js"
import 'video.js/dist/video-js.css'

export default {
    name: "VideoLessonPlayer",
    mounted() {
        
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    },
    methods: {
        init(id_of_video, videoSrc){
            this.video.id = id_of_video;
            this.video.src = videoSrc;
			...
        },
        controlSpeed(v, el) {
			...
        },
        designControlpeed() {
			...
        },
        controlRewind(isForward) {
			...
        },
        playerStatusFlipChange(btnEl) {
			...
        },
        controlSpeedVisual() {
			...
        },
        initPlayer(){
            ...
        }
    },
    data() {

        document.title = "Урок | 13DANCEONLINE";
        return {
            video: {
                id: 0,
                src: null
            },
            tutorialLessonViewModel: null
        }
    }
}
</script>



<style>
...
</style>