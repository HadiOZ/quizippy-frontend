import QuiztFooter from '@/components/QuiztFooter.vue'
import axios from 'axios'

export default {
    components: {
        QuiztFooter
    },

    data(){
        return {
            baseUrl: process.env.VUE_APP_API,
            idUser: localStorage.getItem('token'),
            keySearch: '',
            listSearch: [],
        }
    },

    watch: {
        keySearch: function(key) {
            this.listSearch = [];
            if(key.length != 0){
                axios
                .get(this.baseUrl + 'search?title='+key)
                .then(response => {
                    this.listSearch = response.data
                }, (error) => {
                    console.log(error)
                })
            }
        }
    }
}