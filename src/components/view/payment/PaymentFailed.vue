<template>
    <div class="row page payment success">

        <Breadcamp nameOfPage="Ошибка при оплате" />

        <div class="col-12 block">
            <h4>При оплате счета №{{id_of_payment}} прошла ошибка</h4>
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
        document.title = "Ошибка при оплате | 13DANCEONLINE";
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