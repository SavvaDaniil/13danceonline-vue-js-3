<template>
    
    <div class="row page section_tutorials">
        
        <Breadcamp nameOfPage="Курсы" />

        <!--
        <div class="col-12">
            <div class="filter">
                <ul>
                    <li v-bind:class="{active : filterLevel == 0}" v-on:click="filterByLevel(0)"><p>Все</p></li>
                    <li v-bind:class="{active : filterLevel == 1}" v-on:click="filterByLevel(1)"><p>Начинающие</p></li>
                    <li v-bind:class="{active : filterLevel == 2}" v-on:click="filterByLevel(2)"><p>Продолжающие</p></li>
                </ul>
            </div>
        </div>
        -->
        
        <div class="col-12 warning" v-if="this.isError">
            <p>Ошибка на стороне сервера</p>
        </div>

        <div class="col-12 loading" v-if="!this.isLaunched && !this.isError">
            <p>Подождите, идет загрузка</p>
        </div>

        <div class="col-12 error" v-if="this.coursePreviewViewModels.length == 0 && this.isLaunched && !this.isError">
            <p>- Не найдено -</p>
        </div>

        <div class="col-12 row tutorials">


            <CoursePreview 
                v-for="coursePreviewViewModel in coursePreviewViewModels" :key="coursePreviewViewModel.id"
                :nameOfCourse="coursePreviewViewModel.name"
                :price="coursePreviewViewModel.price"
                :posterSrc="this.$store.state.apiDomain + coursePreviewViewModel.posterSrc"
                :isActive="coursePreviewViewModel.isActive"
                v-on:click="checkAccess(coursePreviewViewModel.id)"
             />
        </div>
    </div>

</template>


<script>
import Breadcamp from "../../template/Breadcamp.vue"
import CoursePreview from "./CoursePreview.vue";
import VueCookies from 'vue-cookies';

export default {
    name : "Courses",
    components: {
        Breadcamp,
        CoursePreview
    },
    methods : {
        async search(){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({"page": this.page})
            };
            
            await fetch(this.$store.state.apiDomain + "api/course/search", requestOptions)
            .then(async response => {
                this.isLaunched = true;
                const data = await response.json();
                if(data["status"] == "success" && data["coursePreviewViewModels"] != null){
                    this.coursePreviewViewModels = data["coursePreviewViewModels"];
                } else {
                    console.log("Неизвестная ошибка на сервере");
                }
            })
            .catch(async error => {
                this.isError = true;
                this.isLaunched = true;
                console.log(error);
            });
        },
        async checkAccess(id_of_course){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"id_of_course" : id_of_course})
            };
            await fetch(this.$store.state.apiDomain + "api/course/check_access", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success"){
                    //console.log("success");
                    this.$router.push("/course/" + id_of_course);
                } else if(data["status"] == "error" && data["errors"] == "not_auth"){
                    this.$router.push("/login");
                } else if(data["status"] == "error" && data["errors"] == "no_access"){
                    this.$router.push("/course/buy/" + id_of_course);
                } else {
                    alert("Неизвестная ошибка на сервере");
                }
            })
            .catch(async error => {
                console.log(error);
            });
        }
    },
    mounted(){
        this.search();
    },
    data(){
        document.title = "Курсы | 13DANCEONLINE";

        return {
            isError: false,
            isLaunched : false,
            page : 0,
            filterLevel : 0,
            coursePreviewViewModels : []
        }
    }
}
</script>

<style scoped>

.row {
	padding:0;
	margin:0;
}
.page {
	padding:0 35px 50px 35px;
    min-height: 100%;
}
.page .tutorials {
	margin-top:35px;
}

.section_tutorials {
	background-color:#ffd362;
}


.filter {
    font-family: 'Proxima Nova';
}
.filter ul {
	padding:0;
	margin:25px 0;
	list-style:none;
	font-weight:bold;
	
}
.filter ul li {
	float:left;
	margin-right:15px;
}
.filter ul li p {
	background-color:#dcdcdc;
	color:#000;
	margin:0;
	padding:6px 12px;
	border-radius:6px;
	cursor:pointer;
}
.filter ul li.active p {
	background-color:#000;
	color:#fff;
}
.filter select {
	background-color:#000;
	color:#fff;
	font-weight:bold;
}

.warning {
    text-align: center;
    margin:50px 0;
    color:red;
}
.loading {
    text-align: center;
    margin:50px 0;
}
.error {
    text-align: center;
    margin:50px 0;
}
</style>