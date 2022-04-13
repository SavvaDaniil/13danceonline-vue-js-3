<template>
    <div class="row page tutorial lesson">
        <Breadcamp nameOfPage="Урок" />

        <div class="d-none col-lg-1 col-md-1 d-md-block"></div>

        <div class="col-12 col-lg-10 col-md-10 col-sm-12 player">
            <VideoLessonPlayer
                ref="refVideoPlayer"
            />
        </div>
    </div>    
</template>

<script>
import Breadcamp from "../../template/Breadcamp.vue"
import VideoLessonPlayer from "../video/VideoLessonPlayer.vue";
import VueCookies from "vue-cookies";

export default {
    name: "TutorialLesson",
    components: {
        Breadcamp,
        VideoLessonPlayer
    },
    methods: {
        async getLesson(){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({"id_of_tutorial" : parseInt(this.id_of_tutorial, 10)})
            };
            await fetch(this.$store.state.apiDomain + "api/tutorial/lesson/get", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success" && data["tutorialLessonViewModel"] != null){
                    this.tutorialLessonViewModel = data["tutorialLessonViewModel"];
                    //this.initPlayer();
                    this.initLesson();
                } else if(data["status"] == "error" && data["errors"] == "not_find"){
                    this.$router.push("/");
                } else {
                    alert("Неизвестная ошибка на сервере");
                }
            })
            .catch(async error => {
                console.log(error);
                alert("Неизвестная ошибка на сервере");
            });
        },
        initLesson(){
            document.title = this.tutorialLessonViewModel["name"] + " | 13DANCEONLINE";
            this.$refs.refVideoPlayer.init(
                this.tutorialLessonViewModel["videoTutorialLessonViewModel"]["id"],
                this.tutorialLessonViewModel["videoTutorialLessonViewModel"]["videoSrc"]
            );
        }
    },
    data() {

        document.title = "Урок | 13DANCEONLINE";
        return {
            id_of_tutorial: 0,
            tutorialLessonViewModel: null
        }
    },
    mounted() {
        this.id_of_tutorial = this.$route.params.id_of_tutorial;
        this.getLesson();
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>


<style scoped>

.page {
	padding:0 25px 50px 25px;
    min-height: 50vh;
    font-family: 'Proxima Nova';
}

.tutorial.lesson {
	background-color:#ffd362;
}
.tutorial.lesson .player {
    margin-top:25px;
}


.lesson .player {
    /*display: block;*/
    position:relative;
    border-radius:10px;
}
.lesson video {
    border-radius:10px;
}
.lesson .control-plus {
    position:absolute;
    z-index: 2147483647;
    color:#dc0000;
    background-color: #fff;
    margin-top:-120px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;


}

.lesson video.flip {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}
</style>