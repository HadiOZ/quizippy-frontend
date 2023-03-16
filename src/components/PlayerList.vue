<template>
        <b-row class="justify-content-center">
        <b-col class="style shadow-sm d-flex justify-content-between">
            <div class="detail-i">{{name}}</div>
            <div class="detail-i">{{score}}</div>
        </b-col>
        </b-row>
</template>

<script>
export default {
    name : 'PlayerList',
    props : {
        name : {
            type : String,
            required : true
        },
        score : {
            type : Number,
        }
    }
}
</script>

<style scoped>
    .style {

        padding: 12px 20px 12px 20px ;
        margin-top: 6px;
        margin-left: 8px;
        margin-right: 8px;  
        border-radius: 6px;
        background-color: whitesmoke;
    }

    .detail-i {
        display: inline;
    }

</style>