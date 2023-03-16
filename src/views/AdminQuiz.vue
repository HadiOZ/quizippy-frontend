<template>
    <div id="app">
        <div v-show="sw">
        <b-container class="style">
        <b-container class="jstify-content-center head">
        <b-row class="justify-content-center">
            <b-col class="header d-flex justify-content-between">
                <span>{{title}}</span>
                <span>{{ players() }}</span>
            </b-col>
        </b-row>
        </b-container>
        <b-container class="jstify-content-center list">
        <player-list v-for="(i , index) in this.item" :key="index"  v-bind:name="i.nickname"/>
        </b-container>
        </b-container>
        <b-container class="style">
        <b-row class="justify-content-center">
            <b-col cols="md-8 d-flex justify-content-center">
                <b-button class="btn" @click.once="playgame()">LETS PLAY!</b-button>
            </b-col>
        </b-row>
        </b-container>
        </div>

        <div v-show="!sw">
        <b-container class="style"> 
        <b-container class="justify-content-center head">    
        <b-row class="justify-content-center">
            <b-col class="header">
                <span>{{title}}</span>
            </b-col>
        </b-row>
        </b-container>
        <b-container class="justify-content-center list">
        <player-list v-for="(i , index) in this.item" :key="index"  v-bind:name="i.nickname" v-bind:score="i.score"/>
        </b-container>
        </b-container>
        <b-container class="style">
        <b-row class="justify-content-center">
            <b-col cols="md-8 d-flex justify-content-between">
                <span class="numb">{{nubquest()}}</span>
                <b-button v-bind:style="button" @click="next()">{{changeText()}}</b-button>
            </b-col>
        </b-row>
        </b-container>
        </div>
    </div>
</template>

<script>
import List from '../components/PlayerList.vue'
import Axios from 'axios'

export default {
    name : 'AdminGame',
    components : {
        'player-list' : List
    },
    data() {
        return {
            api: process.env.VUE_APP_API,
            code : this.$route.query.roomcode,
            quizid: this.$route.query.idquiz, 
            sw : true,
            title : "ROOM : " + this.$route.query.roomcode,
            answerd : 0,
            numberQuestion : 0,
            button : {
                padding: '20px',
                borderRadius: '12px',
                fontWeight: 'bold',
                backgroundColor: 'rgb(134, 134, 134)',
                border: 'none',
            },
            poin : 0,
            duration : 0,
            ptrue : [], //player true array
            item : [], //player array
            questions : []
        }
    },
    beforeUpdate() {
        this.changeColor()
        this.item.sort((a, b) => { return b.score - a.score })
    },
    beforeMount() {
        this.loadQuiz()
        this.$connect(process.env.VUE_APP_WEBSOCKET + '/ws/play?code=' + this.code, {format: 'json'})
        this.onMessage()
    },

    methods : {
        sendMessege(t, msg) {
            this.$socket.sendObj({
                from : "admin",
                type : t,
                message : msg,
            })
        },
        onMessage() {
            this.$socket.onmessage = (event) =>  {
            var data = JSON.parse(event.data)
            if (data.type == "answer") {
                this.answerd++
                this.item.forEach((i) => {
                        if (i.nickname == data.message.player) {
                        i.score += data.message.score
                        if (data.message.value == true) {
                            i.point += 1
                        }
                        }
                        console.log(i)
                    })
            } else if ( data.type == "ping") {
                this.item.push({
                    userref : "",
                    nickname : data.message,
                    score : 0,
                    point : 0
                })
                this.sendMessege('questions', this.quizid) //harus diubah kalo ada datanya nanti
            } else if (data.type == "leave") {
                this.item.forEach( (e) => {
                    if (e.nickname == data.message) {
                        this.item.pop(e)
                    }
                })
            }
            }
        },
        // addPlayer(name) {
        //     this.item.push({
        //             name : name,
        //             score : 0
        //         })
        // },
        extractNum(str) {
            var matches = str.match(/(\d+)/); 
            return parseInt(matches[0])
        },
        loadQuiz() {
            Axios.get(this.api + '/quizdetail?id=' + this.quizid) //http://117.53.46.220:8000/quizdetail?id= ganti alamat dgn ini
            .then(Response => {
                var data = Response.data[0].questions
                data.forEach( val => {
                    this.questions.push(val)
                })
                })
        },
        nubquest() {
            return this.numberQuestion+1 + "/" + this.questions.length
        },
        players() {
            return this.item.length
        },
        playgame() {
            this.sw = !this.sw
            this.title = 'PLAYER RANK'
            this.sendMessege('status', {value: 'play', number: 0})
        },
        changeColor() {
            if (this.answerd == this.item.length) {
                this.button.backgroundColor = '#ffd941'
            } else {
                this.button.backgroundColor = 'rgb(134, 134, 134)'
            }
        },

        changeText() {
            if (this.numberQuestion+1 == this.questions.length){
                if (this.answerd == this.item.length) {
                    return 'FINISH'
                } else {
                    return this.answerd + "/" + this.item.length + " ANSWERED"
                }
            } else {

                if (this.answerd == this.item.length) {
                    return 'NEXT'
                } else {
                    return this.answerd + "/" + this.item.length + " ANSWERED"
                }
            }
        },

        next() {
            if (this.numberQuestion+1 == this.questions.length){
                if (this.answerd == this.item.length) {
                this.sendMessege('rank', this.item)
                const data = {
                    quizrefer: this.quizid,
                    players : this.item
                }
                console.log(data)
                Axios.post(this.api +'/createhistory', data).then((e) => {
                    this.sendMessege('status', {value: 'finished', number: 0})
                    console.log(e.data)
                    this.$router.push({path : "/dashboard"}) 
                })
                }
            } else {
                // SEND RESULT METHODE
                //THIS SEND QUESTION METHODE
                    if (this.answerd == this.item.length) {
                        this.answerd = 0
                        this.numberQuestion++
                        this.sendMessege('status', {value: 'play', number: this.numberQuestion}) // tambahin biar bisa kirim player true
                    }
            }
        }

    }
}
</script>

<style scoped>

#app {
    background-color: #0b2239;
}

span {
    color: whitesmoke;
    font-weight: bolder;
    font-size: 20pt;
}

.numb {
    color: whitesmoke;
    font-weight: bolder;
    font-size: 35pt;
}

.header {
    padding-top: 8px;
    padding-bottom: 10px;
    background-color: #8880ff;
    margin-bottom: 10px; 
}

.style {
    padding-top: 30px;
    padding-bottom: 30px;
}

.btn {
    padding: 20px;
    border-radius: 0;
    font-weight: bold;
    background-color: #ff315b;
    border: none;
    border-radius: 12px 
}

.btn:hover {
    background-color: #d84764;
}

body {
    background-color: #0b2239
}

.head {
    width: 70%;
}

.list {
    height: 378px;
    width: 70%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: rgb(207, 207, 207);
    }
</style>
