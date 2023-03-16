<template>
    <div id="app">
        <b-container v-show="!this.answered" fluid="sm" class="pd">
            <b-row class="justify-content-center">
                <b-col cols="3 text-center">
                    <h1 class="time">{{ duration }}</h1>
                </b-col>
                <b-col cols="6">
                    <b-container class="pic">

                    </b-container>
                </b-col>
                <b-col cols="3 text-center">
                    <h4>RANK : {{ rank }}</h4>
                    <h4>POIN : {{ poin }}</h4>
                </b-col>
            </b-row>
            <b-row class="justify-content-center">
                <b-col cols="10 text-center col quest">
                {{ question}}
                </b-col>
            </b-row>
            <choises v-bind:answ="choises" v-on:answer="choised($event)"/>
        </b-container>
    </div>
    <!-- <div v-else>
        time up your answer is {{ chois }}
        waktu tersisa : {{duration}}
    </div> -->
</template>

<script>
import Choises from './Choises.vue'

export default {
    name : 'Question',
    props : {
        quest : {
            type : Object,
        }
    },
    components : {
        'choises' : Choises
    },
    data() {
        return {
            rank : this.quest.rank,
            poin: this.quest.poin,

            duration : this.quest.duration,
            chois : '',
            answered : false,
            question : this.quest.question,
            choises : this.quest.choises
        }
    },
    methods : {
        countDownTimer() {
            if(this.duration > 0 && this.answered != true) {
                setTimeout(() => {
                    this.duration -= 1
                    this.countDownTimer()
                }, 1000)
            } else {
                this.answered = true
                if (this.chois == '') {this.choised('e')}
            }
        },
        choised(val) {
            this.chois = val
            this.answered = true
            console.log(this.chois)
            this.$emit('answ', {c : val, d : this.duration})
        },
    },
    beforeMount() {this.countDownTimer()}

}
</script>

<style scoped>
#app {
    background-color: whitesmoke;
}

.time {
    margin-top: 35%;
}

h4 {
    margin: 55px;
}

.pic {
    height: 240px;
    width:80%;
    background-color: aqua;
}

.quest {
    box-shadow: 0px 0px 10px #8888;
    margin: 40px;
    padding: 20px 35px 20px 35px;
    border-radius: 8px;
    background-color: white;
}

.pd {
    padding-top: 40px;
    padding-bottom: 40px;
}

</style>