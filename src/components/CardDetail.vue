<template>
    <b-row class="justify-content-center">
        <b-col cols="10" class="style shadow-sm d-flex justify-content-between">
            <div class="detail-i">
                {{rank}}
                <img src="../assets/profile-icon.png" alt="profil-pic"> {{item.nickname}}
            </div>
            <div class="detail-i pd">
                <span class="mr-5">{{item.point}}/{{totalQuestion}}</span>
                {{item.score}}
            </div>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: 'Detail',
        props: {
            rank: {
                type: Number
            },
    
            totalQuestion: {
                type: Number
            },
    
            item: {
                type: Object,
                required: true
            }
        },

        data(){
            return {
                
            }
        }
    }
</script>


<style scoped>
    img {
        margin-left: 32px;
        margin-right: 8px;
        border-radius: 25px;
        height: 45px;
        width: auto;
    }
    
    .color {
        background-color: aqua;
    }
    
    .style {
        padding: 12px 20px 12px 20px;
        margin-top: 6px;
        border-radius: 6px;
        background-color: white;
    }
    
    .detail-i {
        display: inline;
    }
    
    .pd {
        padding-top: 9px;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    
    {
        opacity: 0;
    }
</style>