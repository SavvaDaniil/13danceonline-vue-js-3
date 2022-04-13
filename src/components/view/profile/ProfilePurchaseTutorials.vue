<template>
    <div class="row purchase-tutorials">
        <div v-if="purchaseTutorials.length == 0">
            <p>Приобретенных уроков не найдено</p>
        </div>
    </div>
</template>


<script>
export default {
    name: "ProfilePurchaseTutorials",
    data(){
        return {
            purchaseTutorials : []
        }
    }    
}
</script>

<style scoped>
.purchase-tutorials {
    min-height:50vh;
}
</style>