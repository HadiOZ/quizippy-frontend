<template>
    <b-container>
    <b-row class="justify-content-center">
        <b-col class="card-q d-flex justify-content-between sdw" cols="10">
                <div class="card-title-">
                    <h4>{{title}}</h4>
                </div>
                <div class="card-people- ml-auto">
                    <span v-show="!show" id="part">{{item.length}} Participant</span>
                </div>
        </b-col>
    </b-row>
    <det v-for="(i, index) in item" :key="index" v-bind:item="i" v-bind:rank="index+1" v-bind:totalQuestion="totalQuestion"/>
    </b-container>
</template>

<script>
import Detail from './CardDetail.vue'

export default {
    name : 'Card',

    props : {
        title: {
            type: String
        },

        totalQuestion: {
            type: Number
        },

        item : {
            type : Array,
            required : true
        }
    },

    data() {
        return {
        }
    },

    components : {
        det : Detail
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
  padding: 15px;
}

.card-title- h4 {
    margin: 0px;
}

.card-people- {
  display: inline-block;
  padding: 15px;
}


</style>