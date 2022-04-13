<template>
    <div class="row page login">

        <Breadcamp nameOfPage="Вход" />

        <div class="col-lg-4 col-md-3 col-sm-3 d-sm-block d-none"></div>
        <div class="col-12 col-lg-4 col-md-6 col-sm-6 row">
            <div class="col-12">
                <img src="/images/logo.png" class="img-fluid">

                <form>
                    <input type="text" class="form-control" v-model="loginData.username" placeholder="Email" v-on:keypress="clearWarning" />
                    <input type="password" class="form-control" v-model="loginData.password" placeholder="Пароль" v-on:keypress="clearWarning" />

                    <button type="button" class="btn btn-filled" v-on:click="login">Войти</button>
                </form>
                <p class="warning">{{ this.warning }}</p>
            </div>
            <div class="col-6" style="padding:0;">
                <p class="right-desc">
                    <span>У меня нет аккаунта</span>
                </p>
            </div>

            <div class="col-6" style="padding:0;">
                <p class="left-desc">
                    <router-link to="/registration"><button class="btn btn-tr">Зарегистрироваться</button></router-link>
                </p>
            </div>

            <div class="col-6" style="padding:0;">
                <p class="right-desc"><span>Забыли пароль?</span></p>
            </div>

            <div class="col-6" style="padding:0;">
                <p class="left-desc">
                    <router-link to="/forget"><button class="btn btn-tr">Восстановление пароля</button></router-link>
                </p>
            </div>

        </div>
        
    </div>
</template>


<script>
import Breadcamp from "../../template/Breadcamp.vue"
import VueCookies from 'vue-cookies'

export default {
    name: "Login",
    components: {
        Breadcamp
    },
    methods: {
        async login(){
            this.warning = "";
            if(this.loginData.username == null || this.loginData.password == null) {
                this.warning = "Все поля обязательны к заполнению";
                return;
            }
            const requestOptions = {
                method: "POST",
                //application/json
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.loginData)
            };
            await fetch(this.$store.state.apiDomain + "api/user/login", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success" && data["accessToken"] != null){
                    //console.log("success");
                    VueCookies.set("user", data["accessToken"], "365d");
                    this.$store.commit("signIn");
                    this.$router.push("/");
                } else if(data["status"] == "error" && data["errors"] == "wrong"){
                    this.warning = "Неправильно введен логин или пароль";
                } else {
                    this.warning = "Неизвестная ошибка на сервере";
                }
            })
            .catch(async error => {
                console.log(error);
                this.warning = "Неизвестная ошибка на сервере";
            });
        },
        clearWarning(){
            this.warning = null;
        }
    },
    beforeMount(){
        if(this.$store.state.isAuth){
            this.$router.push("/");
        }
    },
    data(){
        document.title = "Вход | 13DANCEONLINE";
        console.log("Cookie: " + VueCookies.get("user"));
        return {
            loginData: {
                username:null,
                password:null
            },
            warning: null
        }
    }
}
</script>

<style scoped>
.page {
	padding:0 35px 50px 35px;
    min-height: 100%;
    font-family: 'Proxima Nova';
}
.page.login {
    text-align: center;
}

form {
    margin:50px 0;
    text-align: center;
}
input {
    display:inline;
    margin-top: 15px;
    width: 80%;
    font-size: 12px;
    padding: 10px 20px;
}
.btn-filled {
    margin-top: 15px;
    font-size: 12px;
    background-color: #333333;
    color: #fff;
    width: 80%;
}
.right-desc {
    margin-top: 10px;
    font-size: 12px;
    text-align: right;
}
.right-desc span {
    border-bottom: 1px solid #000;
}
.left-desc {
    text-align: left;
}
.btn-tr {
    font-size: 12px;
    border: 1px solid #000;
    margin-left: 10px;
    margin-top: 6px;
    padding: 3px 12px;
}
.warning {
    color:red;
    font-size:14px;
}
</style>