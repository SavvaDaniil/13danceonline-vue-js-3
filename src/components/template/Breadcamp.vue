<template>
    <div class="col-12">
        <div class="breadcamp">
            <ul>
                <li>{{ this.title }}</li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    name: "Breadcamp",
    props: {
        nameOfPage:String
    },
    mounted(){
        this.title = this.nameOfPage;
    },
    data(){
        return {
            title : null
        }
    }
}
</script>

<style scoped>
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'),
        url('../../assets/font/Proxima Nova.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
.breadcamp {
    font-family: 'Proxima Nova';
}
.breadcamp ul {
	padding:0;
	margin:25px 0;
	list-style:none;
	font-size:22px;
}
.breadcamp ul li {
	float:left;
	margin-right:8px;
}
.breadcamp ul li a {
	color:#fff;
	text-decoration:none;
}
</style>