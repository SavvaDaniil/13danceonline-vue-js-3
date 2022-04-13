<template>
    <div class="row page login">

        <Breadcamp nameOfPage="Регистрация" />

        <div class="col-lg-4 col-md-3 col-sm-3 d-sm-block d-none"></div>
        <div class="col-12 col-lg-4 col-md-6 col-sm-6 row">
            <div class="col-12">
                <img src="/images/logo.png" class="img-fluid">

                <form>
                    <input type="text" class="form-control" v-model="registrationData.firstname" placeholder="Ваше имя" />
                    <input type="text" class="form-control" v-model="registrationData.username" placeholder="Email" />
                    <input type="password" class="form-control" v-model="registrationData.password" placeholder="Придумайте пароль" />
                    <input type="password" class="form-control" v-model="registrationData.passwordAgain" placeholder="Пароль еще раз" />

                    <button type="button" class="btn btn-filled" >Зарегистрироваться</button>
                </form>
            </div>
            <div class="col-6" style="padding:0;">
                <p class="right-desc">
                    <span>У меня есть аккаунт</span>
                </p>
            </div>

            <div class="col-6" style="padding:0;">
                <p class="left-desc">
                    <router-link to="/login"><button class="btn btn-tr">Войти</button></router-link>
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

export default {
    name: "Registration",
    components: {
        Breadcamp
    },
    data(){
        document.title = "Регистрация | 13DANCEONLINE";
        return {
            registrationData: {
                firstname:null,
                username:null,
                password:null,
                passwordAgain:null,
            }
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
</style>