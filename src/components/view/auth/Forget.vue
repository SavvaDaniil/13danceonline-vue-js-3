<template>
    <div class="row page login">

        <Breadcamp nameOfPage="Восстановление пароля" />

        <div class="col-lg-4 col-md-3 col-sm-3 d-sm-block d-none"></div>
        <div class="col-12 col-lg-4 col-md-6 col-sm-6 row">
            <div class="col-12">
                <img src="/images/logo.png" class="img-fluid">

                <form v-if="this.forgetData.step == 0">
                    <input type="text" class="form-control" v-model="forgetData.username" placeholder="Электронная почта"
                    v-on:keypress="clearWarningText" />

                    <button type="button" class="btn btn-filled" v-on:click="forgetInit(0)">Отправить 6-тизначный код</button>
                    <p class="warning">
                        {{warningText}}
                    </p>
                </form>

                <form v-if="this.forgetData.step == 1">
                    <p>На вашу почту был отправлен 6-ти значный код, введите его в поле ниже пожалуйста</p>
                    <input type="text" class="form-control" v-model="forgetData.code" placeholder="Код" />
                    <button type="button" class="btn btn-filled" v-on:click="forgetInit(1)">Отправить 6-тизначный код</button>
                    <button type="button" class="btn btn-filled" v-on:click="forgetCansel">Отмена</button>
                    <p class="warning">
                        {{warningText}}
                    </p>
                </form>
                
            </div>
            <div class="col-6" style="padding:0;">
                <p class="right-desc">
                    <span>Вспомнили пароль</span>
                </p>
            </div>

            <div class="col-6" style="padding:0;">
                <p class="left-desc">
                    <router-link to="/login"><button class="btn btn-tr">Войти</button></router-link>
                </p>
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

        </div>
        
    </div>
</template>


<script>
import Breadcamp from "../../template/Breadcamp.vue"
import VueCookies from "vue-cookies";

export default {
    name: "Forget",
    components: {
        Breadcamp
    },
    methods: {
        clearWarningText(){
            this.warningText = "";
        },
        async forgetInit(step){
            this.warningText = "";
            if(step == 0 && this.forgetData.username == null) {
                this.warningText = "Укажите пожалуйста электронную почту";
                return;
            } else if(step == 1 && this.forgetData.code == null){
                this.warningText = "Введите пожалуйста 6-ти значный код";
                return;
            }
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.forgetData)
            };
            await fetch(this.$store.state.apiDomain + "api/user/forget", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success"){
                    if(step == 0 && data["forget_id"] != null){
                        this.forgetData.forget_id = data["forget_id"];
                        this.forgetData.code = null;
                        this.forgetData.step = 1;
                    } else if (step == 1 && data["accessToken"] != null){
                        VueCookies.set("user", data["accessToken"], "365d");
                        this.$store.commit("signIn");
                        this.$router.push("/");
                    } else {
                        this.warningText = "Неизвестная ошибка на сервере";
                    }
                } else if (data["status"] == "error" && data["errors"] == "max_limit_try") {
                    this.warningText = "Превышен лимит попыток, подождите пожалуйста 20 минут";
                } else if(data["status"] == "error" && data["errors"] == "not_found"){
                    this.warningText = "Электронная почта не зарегистрирована";
                } else if (data["status"] == "error" && data["errors"] == "wrong_max_limit") {
                    this.warningText = "Количество попыток исчерпано";
                } else if (data["status"] == "error" && data["errors"] == "wrong_2") {
                    this.warningText = "Код введён неверно, осталось попыток: 1";
                } else if (data["status"] == "error" && data["errors"] == "wrong_1") {
                    this.warningText = "Код введён неверно, осталось попыток: 2";
                } else if (data["status"] == "error" && data["errors"] == "wrong") {
                    this.warningText = "Код введён неверно, осталось попыток: 3";
                } else {
                    this.warningText = "Неизвестная ошибка на сервере";
                }
            })
            .catch(async error => {
                console.log(error);
                this.warningText = "Неизвестная ошибка на сервере";
            });
        },
        forgetCansel(){
            this.warningText = "";
            this.forgetData.step = 0;
        }
    },
    data(){
        document.title = "Восстановление пароля | 13DANCEONLINE";
        return {
            forgetData: {
                username:null,
                forget_id:null,
                code:null,
                step:0
            },
            warningText:null
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
    margin-top:18px;
    font-size:14px;
    color:red;
}
</style>