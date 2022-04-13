<template>
    <div class="row" id="header">
        <div class="col-2 col-lg-1 col-md-1 col-sm-2" style="padding:0;margin:0;">
            <img src="/images/logo.png" class="img-fluid logo" />
        </div>
        <div class="col-10 menu d-none d-md-block" style="padding:0;">
            <ul class="">
                <li class="li-menu"><router-link to="/">Туториалы</router-link></li>
                <li class="li-menu"><router-link to="/courses">Курсы</router-link></li>
                <!--
                <li class="li-menu"><a href="/contact">Контакты</a></li>
                <li class="li-menu"><a href="/cart">Корзина</a></li>
                -->
                
                <li class="li-menu" v-if="this.$store.state.isAuth"><router-link to="/profile">Профиль</router-link></li>
                <li class="li-menu" v-if="this.$store.state.isAuth" v-on:click="logout"><router-link to="/">Выйти</router-link></li>

                <li class="li-menu" v-if="!this.$store.state.isAuth"><router-link to="/registration">Регистрация</router-link></li>
                <li class="li-menu" v-if="!this.$store.state.isAuth"><router-link to="/login">Войти</router-link></li>
            </ul>
        </div>
        <!--
        <div class="col-2 d-none d-md-block">
            <ul class="messanger">
                <li class="li-menu">
                    <a href="#">
                        <img class="img-fluid" src="/images/whatsapp.png" />
                    </a>
                </li>
                <li class="li-menu">
                    <a href="#">
                        <img class="img-fluid" src="/images/telegram.png" />
                    </a>
                </li>
            </ul>
        </div>
        -->

        <div class="col-10 d-lg-none d-md-none d-sm-none">
            <p class="bars">
                <button class="btn" id="bars" onclick="b();">
                    <img src="/images/bars.png" class="img-fluid" />
                </button>
            </p>
        </div>

    </div>
</template>



<script>
import VueCookies from "vue-cookies";

export default {
    name:"Header",
    methods: {
        logout(){
            VueCookies.set("user", "", "-1d");
            this.$store.commit("signOut");
            this.$router.push("/");
        }
    }
}
</script>


<style scoped>
/*
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'),
        url('/assets/font/Proxima Nova.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
*/
#header {
	margin:0;
    font-family: 'Proxima Nova';
}
#header img.logo {
	margin:15px 0 15px 35px;
}
#header a {
	color:#000;
	text-transform:uppercase;
	text-decoration:none;
    font-size:16px;
}
#header ul {
	list-style:none;
	float:right;
}
#header ul .li-menu {
	float:left;
}
#header .menu ul .li-menu {
	padding-top:45px;
	margin-right:25px;
}
#header .li-btn {
    color: #000!important;
    padding:0;
}


#header .menu ul li a {
	font-weight:bold;
}
#header .menu ul .li-menu.active {
	padding-top:35px;
	border-top:10px solid #ffd362;
}
#header .menu ul .li-menu.active a {
	color:#ffd362;
}
#header ul.messanger {
	margin-top:30px;
}
#header ul.messanger li {
	margin-right:15px;
}
#header .login div {
	padding:45px 0;
	background-color:#dcdcdc;
	text-align:center;
}
#header .registration div {
	padding:45px 0;
	background-color:#333333;
	text-align:center;
	color:#fff;
}
#header a.dropdown-item {
	color:#000!important;
}
#header .dropdown-item {
	text-align:right;
}
#header .dropdown-item img {
	margin:-5px 5px 0 0;
}
#header p {
	margin:0;
	text-align:right;
}
#header .lk div {
	padding:35px 0;
	text-align:center;
  font-weight:bold;
	color:#000;
	border-top:10px solid #fff;
}
#header .cart div {
	padding:45px 0 35px 0;
	text-align:center;
  font-weight:bold;
	color:#000;
}
#header .cart.active div {
  padding:35px 0;
	color:#ffd362;
	border-top:10px solid #ffd362;
}
#header .cart img {
  height:20px;
  margin:-8px 4px 0 0;
}
#header .lk_active div {
	padding:35px 0;
	text-align:center;
	color:#ffd362;
	border-top:10px solid #ffd362;
}
#header .logout div {
	padding:45px 0 35px 0;
	text-align:center;
  font-weight:bold;
	color:#000;
}
</style>