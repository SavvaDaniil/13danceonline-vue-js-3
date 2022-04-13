<template>
    <div class="row footer">
        <div class="col-12 col-lg-8 col-md-12 col-sm-12">
            <img src="/images/logo_white.png" class="img-fluid" />
            <p>©2022 13 Dance Studio Online<br />
            Learn to control your body
            </p>
        </div>
        <div class="col-12 col-lg-2 col-md-12 col-sm-12">
            <ul>
                <li><router-link to="/">Главная</router-link></li>
                <li><router-link to="/courses">Курсы</router-link></li>
            </ul>
        </div>
        <div class="col-12 col-lg-2 col-md-12 col-sm-12">
            <ul>
                <li><a href="https://vk.com/13dance" target="_blank">Вконтакте</a></li>
                <li><a href="#">Контакты</a></li>
            </ul>
        </div>

    </div>
</template>


<script>
export default {
    name:"Footer"
}
</script>

<style scoped>

.row {
	padding:0;
	margin:0;
}
.footer {
    font-family: 'Proxima Nova';
	text-transform:uppercase;
	padding:35px 0 100px 0;
	background-color:#202020;
}
.footer p {
	margin-left:45px;
	color:#fff;
}
.footer ul {
	list-style:none;
	margin-top:45px;
}
.footer ul li {
	margin-bottom:10px;
}
.footer ul li a {
	color:#8d8d8d;
	text-decoration:none;
	font-weight:bold;
}

</style>