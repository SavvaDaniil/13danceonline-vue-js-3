<template>
    <div class="col-12 col-lg-4 col-md-12 col-sm-12">
        <div class="block">
            <div class="lock" v-if="this.isActive != 1">
                <font-awesome-icon icon="lock" />
            </div>
            <div class="description" >
                <p class="name">{{ nameOfTutorial }}</p>
                <p v-if="styleName != null"><span>Направление</span>: {{styleName}}</p>
                <p><span>Преподаватель</span>: {{teacherName}}</p>
                <p v-if="this.isActive != 1"><span>Стоимость</span>: {{price}} руб.</p>
            </div>
            <img :src="posterSrc" class="img-fluid" loading="lazy" />
        </div>
    </div>
</template>


<script>
//<font-awesome-icon icon="fa-solid fa-user-secret" />

export default {
    name: "TutorialPreview",
    props: {
        nameOfTutorial: String,
        styleName: String,
        teacherName: String,
        price: Number,
        posterSrc: String,
        isActive: Number
    }
}
</script>

<style scoped>
.block {
    font-family: 'Proxima Nova';
    margin-bottom: 25px;
    position: relative;
    cursor: pointer;
}
.block .description {
	position:absolute;
	color:#fff;
	bottom:10px;
	left:20px;
}
.block .description p {
	margin-bottom:0;
	font-size:14px;
}
.block .description p.name {
	font-size:20px;
}
.block .description p span {
	font-weight: 700;
}
.block img {
	border-radius: 20px;
}
.block .lock {
	background-color: #202020;
    position: absolute;
    top: 10px;
    right: 24px;
    padding: 2px 8px;
    border-radius: 5px;
}
.block .lock svg {
	color:#fff;
}
</style>