<template>
  <div id="app">
    <b-header />
  
    <h1 v-if="iSelected===null" class="text-center mt-5">No History</h1>
  
    <!--listTanggal-->
    <div class="row mt-4">
      <!-- <b-button class="m-1" v-for="(history, index) in listAllHistory" :key="index" :class="{historySelect: index===iSelected}" variant="outline-info" @click="showHistory(index)">{{history.date}}</b-button> -->
      <div class="col-md-5"></div>
      <div class="col-md-2">
        <select class="form-control text-center" 
        v-if="iSelected!=null"
        @change="showHistory($event.target.selectedIndex)">
                  <option v-for="(history, index) in listAllHistory" :key="index">
                    {{history.date.replace(/-/g,' ')}}</option>  
            </select>
      </div>
      <div class="col-md-5"></div>
    </div>
  
    <b-container id="pd" class="mt-3 mb-5">
      <card v-bind:item="players" v-bind:title="quizTitle" v-bind:totalQuestion="totalQuestion" />
    </b-container>
  </div>
</template>

<script>
  //import HelloWorld from './components/HelloWorld.vue'
  import Header from '../components/Header.vue'
  import Card from '../components/Card.vue'
  import axios from 'axios'
  
  export default {
    name: 'Summary Result',
    props: ['idquiz'],
    components: {
      'b-header': Header,
      'card': Card
    },
    data() {
      return {
        api: process.env.VUE_APP_API,
        listAllHistory: null,
  
        quizTitle: null,
  
        totalQuestion: null,
  
        players: null,
  
        iSelected: null
      }
    },
  
    mounted() {
      var url = this.api + '/history?quizid=' + this.idquiz
      axios
        .get(url)
        .then(response => {
          console.log(response)
          this.listAllHistory = response.data.reverse()
  
          if (this.listAllHistory.length > 0) {
            this.iSelected = 0
            this.players = this.listAllHistory[this.iSelected].players
            this.getQuizData(this.listAllHistory[this.iSelected].quizrefer)
          }
        })
    },
  
    methods: {
      showHistory(index) {
        this.iSelected = index
        this.players = this.listAllHistory[this.iSelected].players
      },
  
      getQuizData() {
        var url = this.api + '/quizdetail?id=' + this.idquiz
        axios
          .get(url)
          .then(response => {
            this.quizTitle = response.data[0].title
            this.totalQuestion = response.data[0].questions.length
            console.log(this.quizTitle)
          })
      }
    }
  }
</script>

<style>
  body {
    background-color: whitesmoke
  }
  
  .historySelect {
    background-color: #17a2b8;
    color: #fff;
  }
  
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: whitesmoke;
  }
</style>
