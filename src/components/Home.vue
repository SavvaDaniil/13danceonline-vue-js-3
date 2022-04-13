<template>
    <div class="row section1">
        <div class="col-2 d-none d-md-block"></div>
        <div class="col-12 col-lg-5 col-md-5 col-sm-12">
            <h2>
                Научись<br />управлять<br />своим телом<br />online
            </h2>
            <a href="#">
                <button class="btn">
                    Начать<br />танцевать
                </button>
            </a>
        </div>
        <div class="col-5" style="padding:0;margin:0;">
            <img src="/images/section1.png" class="img-fluid" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>


<style scoped>

.section1 {
	height:90vh;
	background-color:#ffd362;
    font-family: 'Proxima Nova';
}

.section1 h2 {
	margin-top:20%;
	font-size:70px;
	font-weight:bold;
}
.section1 .btn {
	background: #4F78B6;
	border-radius: 10px;
	color:#FDFAFA;
	font-size: 26px;
	font-weight:bold;
	text-transform: uppercase;
	margin-top:50px;
	padding:20px 100px;
}
.section1 img {
	position:absolute;
	bottom:0;
	float:left;
	height:auto;
	width:100%;
	margin-left: -30%;
}
</style>