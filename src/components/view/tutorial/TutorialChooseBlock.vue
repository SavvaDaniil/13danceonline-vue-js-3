<template>
    <div class="block row" :class="{active: active}" >
        <div class="col-8">
            <p>{{name}}</p>
        </div>
        <div class="col-4 price">
            <p>{{price}} руб</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TutorialChooseBlock",
    props: {
        id:Number,
        name:String,
        price:Number,
        active:Boolean
    }
}
</script>

<style scoped>
p {
    margin-bottom: 0;
}
.block {
    border: 1px solid #333333;
    border-radius: 10px;
    padding:15px;
    color:#333333;
    cursor: pointer;
    margin:0 0 15px 0;
    font-family: 'Proxima Nova';
}
.block.active {
    color:#fff;
    background-color: #333333;
}
.block .price {
    text-align: right;
}
</style>