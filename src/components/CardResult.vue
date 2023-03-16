<template>
    <b-container>
    <b-row class="justify-content-center">
        <b-col class="card-q d-flex justify-content-between sdw" cols="10">
                <div class="card-title-">
                    
                </div>
                <div class="card-people- ml-auto">
                    <span v-show="!show" id="part">{{item.part.summary}} Participant</span>
                </div>
        </b-col>
    </b-row>
    <det v-for="(i, index) in details" :key="index" v-bind:item="i"/>
    </b-container>
</template>

<script>
import Detail from './CardDetail.vue'

export default {
    name : 'Card',
    props : {
        item : {
            type : Object,
            required : true
        }
    },
    data() {
        return {
            show : false,
            details : this.item.part.detail
        }
    },
    components : {
        det : Detail
    },
    methods : {
        showDetail() {
            this.show = !this.show
        }
    }
}
</script>

<style scoped>
.card-q {
  color: white;
  background-color: #0b2239;
  padding: 12px 12px 12px 16px;
  margin-top: 12px;
}

span {
  display: block;
}

#category {
    font-style: italic;
}

.card-title- {
 font-weight: bold;
  display: inline-block;
}
.card-people- {
  display: inline-block;
  padding: 11px;
}


</style>