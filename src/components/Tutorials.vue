
<template>

    <div class="row page section_tutorials">
        
        <Breadcamp nameOfPage="Туториалы" />

        <div class="col-12">
            <div class="filter">
                <ul>
                    <li v-bind:class="{active : filterLevel == 0}" v-on:click="filterByLevel(0)"><p>Все</p></li>
                    <!--
                    <li v-bind:class="{active : filterLevel == 1}" v-on:click="filterByLevel(1)"><p>Начинающие</p></li>
                    <li v-bind:class="{active : filterLevel == 2}" v-on:click="filterByLevel(2)"><p>Продолжающие</p></li>
                    -->
                    
                    <li>
                        <select class="form-control" v-on:change="filterByStyle($event)">
                            <option value="0">Все стили</option>
                            <option 
                            v-for="styleMicroViewModel in this.styleMicroViewModels" :key="styleMicroViewModel.id"
                            :value="styleMicroViewModel.id"
                            >
                            {{ styleMicroViewModel.name }}
                            </option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="col-12 warning" v-if="this.isError">
            <p>Ошибка на стороне сервера</p>
        </div>

        <div class="col-12 loading" v-if="!this.isLaunched && !this.isError">
            <p>Подождите, идет загрузка</p>
        </div>

        <div class="col-12 error" v-if="this.tutorialPreviewViewModels.length == 0 && this.isLaunched && !this.isError">
            <p>- Не найдено -</p>
        </div>

        <div class="col-12 row tutorials">

            <!--
            <TutorialPreview 
                nameOfTutorial="Наименование"
                styleName="Frame Up Strip"
                teacherName="Елизавета Сергеева"
                posterSrc="/images/0.jpg"
                price=300
                isActive=0
             />
             -->

            <TutorialPreview 
                v-for="tutorialPreviewViewModel in tutorialPreviewViewModels" :key="tutorialPreviewViewModel.id"
                :nameOfTutorial="tutorialPreviewViewModel.name"
                :price="tutorialPreviewViewModel.price"
                :posterSrc="this.$store.state.apiDomain + tutorialPreviewViewModel.posterSrc"
                :isActive="tutorialPreviewViewModel.isActive"
                v-on:click="checkAccess(tutorialPreviewViewModel.id)"
             />
        </div>
    </div>

</template>

<script>
import Breadcamp from "./template/Breadcamp.vue"
import TutorialPreview from "./TutorialPreview.vue"
import VueCookies from 'vue-cookies'

export default {
    name: "Tutorials",
    components: {
        Breadcamp,
        TutorialPreview
    },
    methods : {
        filterByStyle(event){
            this.id_of_style = parseInt(event.target.value, 10);
            console.log("this.id_of_style: " + this.id_of_style);
            this.search();
        },
        filterByLevel(level){
            this.filterLevel = level;
        },
        async search(){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({"page": this.page, "id_of_style": this.id_of_style})
            };
            
            await fetch(this.$store.state.apiDomain + "api/tutorial/search", requestOptions)
            .then(async response => {
                this.isLaunched = true;
                const data = await response.json();
                if(data["status"] == "success" && data["tutorialPreviewViewModels"] != null){
                    this.tutorialPreviewViewModels = data["tutorialPreviewViewModels"];
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
        async checkAccess(id_of_tutorial){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"id_of_tutorial" : id_of_tutorial})
            };
            await fetch(this.$store.state.apiDomain + "api/tutorial/check_access", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success"){
                    //console.log("success");
                    this.$router.push("/tutorial/" + id_of_tutorial);
                } else if(data["status"] == "error" && data["errors"] == "not_auth"){
                    this.$router.push("/login");
                } else if(data["status"] == "error" && data["errors"] == "no_access"){
                    this.$router.push("/tutorial/buy/" + id_of_tutorial);
                } else {
                    alert("Неизвестная ошибка на сервере");
                }
            })
            .catch(async error => {
                console.log(error);
            });
        },
        async getStyles(){
            const requestOptions = {
                method: "POST"
            };
            
            await fetch(this.$store.state.apiDomain + "api/style/list/micro", requestOptions)
            .then(async response => {
                this.isLaunched = true;
                const data = await response.json();
                if(data["status"] == "success" && data["styleMicroViewModels"] != null){
                    this.styleMicroViewModels = data["styleMicroViewModels"];
                } else {
                    console.log("Неизвестная ошибка на сервере");
                }
            })
            .catch(async error => {
                console.log(error);
            });
        },
    },
    mounted(){
        this.getStyles();
        this.search();
    },
    data(){
        document.title = "Туториалы | 13DANCEONLINE";

        return {
            isError: false,
            page : 0,
            id_of_style:0,
            filterLevel: 0,
            isLaunched : false,
            tutorialPreviewViewModels : [],
            styleMicroViewModels : []
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