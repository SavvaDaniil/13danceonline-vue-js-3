<template>
    <div class="row page payment success">

        <Breadcamp nameOfPage="Успешная оплата" />

        <div class="col-12 block">
            <h4>Оплата счета №{{id_of_payment}} прошла успешно</h4>
            <p>перейти к <a href="#">уроку</a></p>
        </div>
    </div>
</template>

<script>
import Breadcamp from "../../template/Breadcamp.vue"

export default {
    name: "PaymentSuccess",
    components: {
        Breadcamp
    },
    beforeMount(){
        if(!this.$store.state.isAuth){
            this.$router.push("/");
        }
    },
    data(){
        document.title = "Успешная оплата счета | 13DANCEONLINE";
        return {
            id_of_payment : 0
        }
    }
}
</script>

<style scoped>

.page {
	padding:0 25px 50px 25px;
    min-height: 50vh;
    font-family: 'Proxima Nova';
}

.payment {
	background-color:#ffd362;
}
.block {
    text-align: center;
}

</style>