import NavDashboard from '@/components/NavDashboard.vue'
import QuiztFooter from '@/components/QuiztFooter.vue'
import axios from 'axios'

export default {
    name: 'Dashboard',
    components: {
        NavDashboard,
        QuiztFooter
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_API,
            slide: 0,
            sliding: null,
            dataUser: null,
            listNews: ['CSS Grid vs Flexbox', '5 Pilihan Framework JavaScript Untuk Web Developer 2020', 'Fitur-fitur Terbaru Android Studio 4.0'],
            listUrl: ['https://www.codepolitan.com/css-grid-vs-flexbox-5b4336849183d', 
            'http://markbro.com/5-pilihan-framework-javascript-untuk-web-developer-2020/', 
            'https://android-developers.googleblog.com/2020/05/android-studio-4.html'],
            
            listYourQuiz: null,

            listTemplate: null,
        }
    },

    created() {
        //roomcode, idquiz
        var idUser = localStorage.getItem('token')

        if (idUser === null) {
            location.href = '/signin'
        } else {
            axios
                .get(this.baseUrl + '/user?id=' + idUser)
                .then(response => {
                    console.log(response.data)
                    this.dataUser = response.data
                }, (error) => {
                    console.log(error)
                })

            axios
                .get(this.baseUrl + '/quiz?author=' + idUser)
                .then(response => {
                    this.listYourQuiz = response.data
                }, (error) => {
                    console.log(error)
                })

        }
    },

    methods: {
        onSlideStart() {
            this.sliding = true
        },
        onSlideEnd() {
            this.sliding = false
        },
        newsClick(){
            window.open(this.listUrl[this.slide],'_blank');
        },

        getRoomCode(){
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var string_length = 6;
            var randomstring = '';
            for (var i = 0; i < string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
            }
            return randomstring
        }
    }
}