<template>
    <div class="row page profile">
        <Breadcamp nameOfPage="Профиль" />

        
        <div class="col-12 errorServer" v-if="this.isError">
            <p>Ошибка на стороне сервера</p>
        </div>

        <div class="col-12 loading" v-if="!this.isLaunched && !this.isError">
            <p>Подождите, идет загрузка</p>
        </div>


        <div class="col-12" v-if="this.isLaunched && !this.isError">

            <b-tabs
            class="profile-tabs"
            active-nav-item-class="nav-link-active"
            content-class="mt-3"
            >
                <b-tab title="Профиль" active>
					<form action="#">
                        <div class="form-group">
                            <label>Имя: </label>
                            <div class="col-12 col-lg-6 col-md-6 col-sm-10" style="padding:0;">
                                <input type="text" class="form-control" maxlength="150" v-model="profileData.firstname" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Логин / Электронная почта: </label>
                            <div class="col-12 col-lg-6 col-md-6 col-sm-10" style="padding:0;">
                                <input type="email" class="form-control" maxlength="150" v-model="profileData.username" />
                            </div>
                        </div>

                        <div class="form-group">
						<label>Новый пароль:</label>
                            <div class="col-12 col-lg-6 col-md-6 col-sm-10" style="padding:0;">
                                <input type="password" class="form-control" maxlength="150" id="passwordNew" name="passwordNew" onkeypress="clearWarningSave(this.id)">
                            </div>
                        </div>
                        <div class="form-group">
						<label>Новый пароль еще раз:</label>
                            <div class="col-12 col-lg-6 col-md-6 col-sm-10" style="padding:0;">
                                <input type="password" class="form-control" maxlength="150" id="passwordNewAgain" name="passwordNewAgain" onkeypress="clearWarningSave(this.id)">
                            </div>
                        </div>
                        <div class="form-group">
						<label>Текущий пароль:</label>
                            <div class="col-12 col-lg-6 col-md-6 col-sm-10" style="padding:0;">
                                <input type="password" class="form-control" maxlength="150" id="passwordCurrent" name="passwordCurrent" onkeypress="clearWarningSave(this.id)">
                            </div>
                        </div>
                        
						<button type="button" class="btn btn-filled" v-on:click="update">Сохранить</button>
						<p class="profile-fetch-status">
                            {{profileFetchStatus}}
                        </p>
					</form>
                </b-tab>
                <!--
                <b-tab title="Мои туториалы">
                    
                    <ProfilePurchaseTutorials />
                    

                </b-tab>
                -->
            </b-tabs>

            


        </div>

    </div>
</template>

<script>
import Breadcamp from "../../template/Breadcamp.vue"
import VueCookies from 'vue-cookies';
//import ProfilePurchaseTutorials from "./ProfilePurchaseTutorials.vue"

export default {
    name:"Profile",
    components: {
        Breadcamp,
        //ProfilePurchaseTutorials
    },
    methods : {

        async getProfile(){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
            };
            await fetch(this.$store.state.apiDomain + "api/user/profile", requestOptions)
            .then(async response => {
                this.isLaunched = true;
                const data = await response.json();
                if(data["status"] == "success" && data["userProfileViewModel"] != null){
                    this.profileData.username = data["userProfileViewModel"]["username"];
                    this.profileData.firstname = data["userProfileViewModel"]["firstname"];
                } else if(data["status"] == "error" && data["errors"] == "user_not_found"){
                    console.log("user_not_found");
                } else {
                    this.isError = true;
                }
            })
            .catch(function(error){
                this.isLaunched = true;
                console.log(error);
            });
        },

        async update(){
            this.profileFetchStatus = null;
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(this.profileData)
            };
            await fetch(this.$store.state.apiDomain + "api/user/update", requestOptions)
            .then(async response => {
                this.isLaunched = true;
                const data = await response.json();
                if(data["status"] == "success"){
                    this.profileFetchStatus = "Успешно сохранено";
                } else if(data["status"] == "error" && data["errors"] == "username_already_exist"){
                    this.profileFetchStatus = "Логин уже есть в базе";
                } else if(data["status"] == "error" && data["errors"] == "wrong"){
                    this.profileFetchStatus = "Текущий пароль введен неверно";
                } else {
                    this.profileFetchStatus = "Неизвестная ошибка на мервере";
                }
            })
            .catch(function(error){
                this.profileFetchStatus = "Неизвестная ошибка на мервере";
                console.log(error);
            });
        }
    },
    beforeMount(){
        if(!this.$store.state.isAuth){
            this.$router.push("/login");
        }
    },
    mounted(){
        this.getProfile();
    },
    data(){
        document.title = "Профиль | 13DANCEONLINE";
        return {
            isLaunched: false,
            isError : false,
            profileData : {
                firstname:null,
                username:null,
                passwordCurrent: null,
                passwordNew:null,
                passwordNewAgain:null
            },
            profileFetchStatus : null,
            tabProfileIndex : 0
        }
    }
}
</script>

<style>

.page.profile .nav-tabs .nav-link {
    color: #333333;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-color: #333333 #333333 #333333;
}
.page.profile .nav-tabs .nav-link-active {
    color: #fff;
    background-color: #333333;
}
</style>

<style scoped>
.page {
	padding:0 35px 50px 35px;
    min-height: 100%;
    font-family: 'Proxima Nova';
}
.page.profile {
	background-color:#ffd362;
}

.tabs {
    margin-top:25px;
}

input {
    margin-bottom:12px;
    padding: 10px 20px;
}

/*
.nav-item a.nav-link.active {
    font-weight: 700;
    border: none!important;
}
*/

.profile-fetch-status {
    margin-top:10px;
}

.btn-filled {
    margin-top: 15px;
    font-size: 12px;
    background-color: #333333;
    color: #fff;
}

.errorServer {
    text-align: center;
    margin:50px 0;
    color:red;
}
.loading {
    text-align: center;
    margin:50px 0;
}
</style>