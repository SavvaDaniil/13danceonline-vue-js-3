<template>
    <div class="row page tutorial buy">
        <Breadcamp nameOfPage="Покупка доступа к уроку" />

        <div class="d-none d-md-block col-lg-4 col-md-3"></div>
        <div class="col-lg-4 col-md-6 col-12">
            <div class="header">
                <h5>{{ this.tutorial.name }}</h5>
            </div>

            <TutorialChooseBlock :id=0 name="Доступ к уроку на 30 дней" :price="this.tutorial.price" :active="this.defaultIsActive" v-on:click="setStore(0)" />

            <!--
            <TutorialChooseBlock :id=1 name="Доступ к уроку на 60 дней" :price=790 v-on:click="setStore(1)" />
            -->
            <TutorialChooseBlock v-for="subscription in subscriptions" :key="subscription.id" 
            :id="subscription.id" 
            :name="subscription.name"
            :price="subscription.price"
            :active="subscription.isActive"
            v-on:click="setStore(subscription.id)"
            />

            <hr />
            
            <button type="button" class="btn btn-filled"
                :disabled="this.id_of_tutorial == 0"
             v-on:click="paymentInit">Купить</button>
        </div>
    </div>
</template>

<script>
import Breadcamp from "../../template/Breadcamp.vue"
import TutorialChooseBlock from "./TutorialChooseBlock.vue"
import VueCookies from "vue-cookies";

export default {
    name: "TutorialBuy",
    components: {
        Breadcamp,
        TutorialChooseBlock
    },
    methods : {
        setStore(id_of_subscription){
            this.id_of_subscription = id_of_subscription;
            if(id_of_subscription == 0){
                this.defaultIsActive = true;
                this.subscriptions.forEach(subscription => {subscription.isActive = false;});
            } else {
                this.defaultIsActive = false;
                this.subscriptions.forEach(subscription => {
                    subscription.isActive = (subscription.id == id_of_subscription);
                });
            }
        },
        async getBuyPrepare(id_of_tutorial){
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"id_of_tutorial" : parseInt(id_of_tutorial, 10)})
            };
            await fetch(this.$store.state.apiDomain + "api/tutorial/buy/prepare", requestOptions)
            .then(async response => {
                const data = await response.json();
                if(data["status"] == "success" && data["tutorialBuyViewModel"] != null){
                    this.tutorial.id = data["tutorialBuyViewModel"]["id"];
                    this.tutorial.name = data["tutorialBuyViewModel"]["name"];
                    this.tutorial.price = data["tutorialBuyViewModel"]["price"];
                    this.subscriptions = [];
                    data["tutorialBuyViewModel"]["subscriptionLiteViewModels"].forEach(subscriptionLiteViewModel => {
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
            if(this.id_of_tutorial == 0)return;
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization" : "Bearer " + VueCookies.get("user"),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    "id_of_tutorial" : parseInt(this.id_of_tutorial, 10),
                    "id_of_subscription" : parseInt(this.id_of_subscription, 10)
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
        //console.log("id_of_tutorial: " + this.$route.params.id_of_tutorial);

    },
    mounted(){
        this.id_of_tutorial = this.$route.params.id_of_tutorial;
        this.getBuyPrepare(this.id_of_tutorial);
    },
    data(){
        document.title = "Покупка доступа | 13DANCEONLINE";
        return {
            id_of_tutorial: 0,
            state: 0,
            id_of_subscription:0,
            defaultIsActive:true,
            tutorial : {
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

.tutorial.buy {
	background-color:#ffd362;
}
.tutorial.buy .header {
    text-align: center;
    margin-bottom: 25px;
}
.tutorial.buy p {
    margin-bottom: 0;
}


.btn-filled {
    font-size: 16px;
    background-color: #333333;
    color: #fff;
    width: 100%;
}

</style>