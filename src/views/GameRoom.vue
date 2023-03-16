<template>
    <!-- <component v-bind:is="this.page"></component> -->
    <div>
    <question-page v-for="(i, index) in this.questions" :key="index" v-bind:quest="i" v-on:answ="sendAnswer($event)"/>
    </div>
</template>

<script>
import Question from '../components/Question.vue'
// import Finish from './components/FInish.vue'
// import Delay from './components/Delay.vue'
// import Result from './components/Result.vue'

//tambah satu state result sate notic kudu inget


export default {
  name : 'GameRoom',
  components: {
    'question-page' : Question,
    // 'result-page' : Result,
    // 'finish-page' : Finish,
    // 'delay-page' : Delay,
  },
  beforeMount() {
    this.$connect(process.env.WEBSOCKET.toString() + "/ws/join?code=" + this.$route.query.code + "&nickname=" + this.$route.query.nickname, {format: 'json'})
    this.onMessage()
    this.onOpen()
    this.onClose()
    this.$socket.onerror = () => console.log("ws error")
  },
  created() {
    console.log(this.nickname)
  },
  data() {
    return {
      page : 'delay-page',
      nickname : this.$route.query.nickname,
      questions : []
    }
  },
  methods : {
    sendMessege(t, msg) {
      this.$socket.sendObj({
        from : this.nckname,
        type : t,
        message : msg,
        
      })
    },
    sendAnswer(v) {
      this.sendMessege('answer', {
        name : this.nickname,
        choises : v.c,
        remaining : v.d
      })
    },
    onMessage() {
      this.$socket.onmessage = (event) => {
        console.log(event.data)
        var res = JSON.parse(event.data)
        console.log(res.type)
        if (res.type == "question") {
          this.questions.push(res.message)
          this.questions.pop(this.questions[0])
          this.onUpdate(res.message)
        } else if (res.type == "status") {
          console.log(res.message)
        }
      }
    },
    onUpdate(v) {
      this.questions.push(v)
    },
    onOpen() {
      this.$socket.onopen = () => {
      this.sendMessege('ping', this.nickname)
      }
    },
    onClose() {
      this.$socket.onclose = () => {
      this.sendMessege('leave', this.nickname) 
      }
    }

  
    
  }
}
</script>

<style scoped>
h3 {
  font-weight:900;
  font-size: 22pt;
  color:#818e9c
}
img {
  margin-bottom: 20px;
}
</style>
