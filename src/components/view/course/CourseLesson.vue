<template>
    <div class="row page course lesson">
        <Breadcamp 
        v-if="breadcampTitle != null"
        :nameOfPage="this.breadcampTitle"
        ref="refTitleUpdate"
         />

        <div class="col-6">
            <button class="btn btn-filled" v-if="this.isPrevLessonAvailable" v-on:click="changeLesson(0)">Предыдущий урок</button>
        </div>
        <div class="col-6 btn-next-lesson">
            <button class="btn btn-filled" v-if="this.isNextLessonAvailable" v-on:click="changeLesson(1)">Следующий урок</button>
        </div>
        <div class="d-none col-lg-1 col-md-1 d-md-block"></div>

        <div class="col-12 col-lg-10 col-md-10 col-sm-12 player">
            <VideoLessonPlayer
                ref="refVideoPlayer"
                :key="number_of_lesson"
            />
        </div>

    </div>  
</template>


<script>
import Breadcamp from "../../template/Breadcamp.vue"
import VideoLessonPlayer from "../video/VideoLessonPlayer.vue";
import VueCookies from "vue-cookies";


export default {
    name : "CourseLesson",
    components: {
        Breadcamp,
        VideoLessonPlayer
    },
    mounted(){
        this.id_of_course = this.$route.params.id_of_course;
        this.number_of_lesson = this.$route.query.lesson;
        if(this.number_of_lesson  == null || typeof(this.number_of_lesson) == "undefined"){
            this.number_of_lesson = 1;
        }
        this.getLesson();
    },
    methods : {
        async getLesson(){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({"id_of_course" : parseInt(this.id_of_course, 10), "number_of_lesson" : parseInt(this.number_of_lesson, 10)})
            };
            await fetch(this.$store.state.apiDomain + "api/course/lesson/get", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success" && data["courseLessonViewModel"] != null){
                    this.courseLessonViewModel = data["courseLessonViewModel"];
                    this.initLesson();
                } else if(data["status"] == "error" && data["errors"] == "no_access"){
                    this.$router.push("/course/buy/" + this.id_of_course);
                }  else if(data["status"] == "error" && data["errors"] == "not_find"){
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
            this.breadcampTitle = "Урок №" + this.number_of_lesson + " - " + this.courseLessonViewModel["name"];
            //this.$refs.refTitleUpdate.updateTitle(this.breadcampTitle);
            if(this.courseLessonViewModel["videoCourseLessonViewModel"]["ids_of_video"].length > 1) {
                if(this.number_of_lesson > 1){
                    this.isPrevLessonAvailable = true;
                }
                if(this.number_of_lesson < this.courseLessonViewModel["videoCourseLessonViewModel"]["ids_of_video"].length){
                    this.isNextLessonAvailable = true;
                }
            }
            this.$refs.refVideoPlayer.init(
                this.courseLessonViewModel["videoCourseLessonViewModel"]["id"],
                this.courseLessonViewModel["videoCourseLessonViewModel"]["videoSrc"]
            );
        },
        changeLesson(value){
            var nextLesson;
            if(value == 0){
                nextLesson = parseInt(this.number_of_lesson, 10) - 1;
            } else {
                nextLesson = parseInt(this.number_of_lesson, 10) + 1;
            }
            //this.$router.push("/course/" + this.id_of_course + "?lesson=" + nextLesson);
            window.location.href = "/course/" + this.id_of_course + "?lesson=" + nextLesson;
            //this.$forceUpdate();
            //this.number_of_lesson = nextLesson;
            //this.getLesson();
        }
    },
    data(){
        document.title = "Урок курса | 13DANCEONLINE";
        return {
            id_of_course: 0,
            breadcampTitle : null,
            number_of_lesson : 1,
            courseLessonViewModel : null,
            isPrevLessonAvailable: false,
            isNextLessonAvailable: false
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

.course.lesson {
	background-color:#ffd362;
}
.course.lesson .player {
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



.btn-next-lesson {
    text-align: right;
}
.btn-filled {
    margin-top: 15px;
    font-size: 14px;
    background-color: #333333;
    color: #fff;
}
</style>