<template>
    <div class="row page course buy">
        <Breadcamp nameOfPage="Покупка доступа к курсу" />

        <div class="col-12">
            <div class="header">
                <h3>{{ this.course.name }}</h3>
            </div>
        </div>

        <div class="d-none d-md-block col-lg-4 col-md-3"></div>
        <div class="col-lg-4 col-md-6 col-12">

            <TutorialChooseBlock :id=0 name="Доступ к курсу на 30 дней" :price="this.course.price" :active="this.defaultIsActive" v-on:click="setStore(0)" />


            <hr />
            
            <button type="button" class="btn btn-filled"
                :disabled="this.id_of_course == 0"
             v-on:click="paymentInit">Купить</button>
        </div>
    </div>
</template>


<script>
import Breadcamp from "../../template/Breadcamp.vue"
import TutorialChooseBlock from "../tutorial/TutorialChooseBlock.vue"
import VueCookies from "vue-cookies";


export default {
    name: "CourseBuy",
    components: {
        Breadcamp,
        TutorialChooseBlock
    },
    methods : {
        async getBuyPrepare(id_of_course){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"id_of_course" : parseInt(id_of_course, 10)})
            };
            await fetch(this.$store.state.apiDomain + "api/course/buy/prepare", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success" && data["courseBuyViewModel"] != null){
                    this.course.id = data["courseBuyViewModel"]["id"];
                    this.course.name = data["courseBuyViewModel"]["name"];
                    this.course.price = data["courseBuyViewModel"]["price"];
                    this.subscriptions = [];
                    data["courseBuyViewModel"]["subscriptionLiteViewModels"].forEach(subscriptionLiteViewModel => {
                        this.subscriptions.push({
                            id: subscriptionLiteViewModel["id"], 
                            name: subscriptionLiteViewModel["name"], 
                            price: subscriptionLiteViewModel["price"], 
                            isActive:false
                        });
                    });
                } else {
                    alert("Неизвестная ошибка на сервере");
                }
            })
            .catch(async error => {
                console.log(error);
            });
        },
        async paymentInit(){
            if(this.id_of_course == 0)return;
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    "id_of_course" : parseInt(this.id_of_course, 10)
                })
            };
            await fetch(this.$store.state.apiDomain + "api/payment/init", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success"){
                    console.log("success");
                } else if(data["status"] == "error" && data["errors"] == "not_auth"){
                    this.$router.push("/login");
                } else {
                    alert("Неизвестная ошибка на сервере");
                }
            })
            .catch(async error => {
                console.log(error);
                alert("Неизвестная ошибка на сервере");
            });
        }
    },
    beforeMount(){
        if(!this.$store.state.isAuth){
            this.$router.push("/");
        }
        //console.log("id_of_course: " + this.$route.params.id_of_course);

    },
    mounted(){
        this.id_of_course = this.$route.params.id_of_course;
        this.getBuyPrepare(this.id_of_course);
    },
    data(){
        document.title = "Покупка доступа к курсу | 13DANCEONLINE";
        return {
            id_of_course: 0,
            state: 0,
            id_of_subscription:0,
            defaultIsActive:true,
            course : {
                id: 0,
                name:null,
                price: 0
            },
            subscriptions : []
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

.course.buy {
	background-color:#ffd362;
}
.course.buy .header h3 {
    text-align: center;
    margin-bottom: 25px;
    font-weight:700;
}
.course.buy p {
    margin-bottom: 0;
}


.btn-filled {
    font-size: 16px;
    background-color: #333333;
    color: #fff;
    width: 100%;
}

</style>