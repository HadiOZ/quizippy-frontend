<template>
    <div>
        <b-row class="justify-content-center p-4">
                <b-col cols="5 justify-content-center" @click="clicked('a')">
                   <b-container class="answer text-center color-a">A</b-container>
                   <b-container class="comment-answer text-center">{{ answ.a }}</b-container>
                </b-col>
                <b-col cols="5 justify-content-center" @click="clicked('b')" > 
                   <b-container class="answer text-center color-b">B</b-container>
                   <b-container class="comment-answer text-center">{{ answ.b }}</b-container>
                </b-col>
            </b-row>
            <b-row class="justify-content-center p-4">
                <b-col cols="5 justify-content-center" @click="clicked('c')">
                   <b-container class="answer text-center color-c">C</b-container>
                   <b-container class="comment-answer text-center">{{ answ.c }}</b-container>
                </b-col>
                <b-col cols="5 justify-content-center" @click="clicked('d')">
                   <b-container class="answer text-center color-d">D</b-container>
                   <b-container class="comment-answer text-center">{{ answ.d }}</b-container>
                </b-col>
            </b-row>
    </div>
</template>
<script>
export default {
    name : 'Choises',
    props : {
        answ : {
            type : Object,
        }
    },
    methods : {
        clicked(value) {
            this.$emit('answer', value)
        }
    }
}
</script>
<style scoped>
.color-a {
    background-color: #8880FF
}

.color-b {
    background-color: #ff315b
}

.color-c {
    background-color: #0b2239
}

.color-d {
    background-color: #ffd941
}

.answer {
    padding: 20px;
    width: 70%;
    color: white;
    font-weight: bolder;
    font-size: 24pt;
}

.comment-answer {
    padding: 4px;
    width: 100%;
    background-color: #292929;
    color: white;
} 
</style>
