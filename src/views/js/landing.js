import axios from 'axios'

export default {
    data: () => {
        return {
            baseUrl: process.env.VUE_APP_API,
            play : process.env.VUE_APP_PLAY,
            slide: 0,
            idUser: null,
            dataUser: null        }
    },

    mounted() {
        this.idUser = localStorage.getItem('token')

        if (this.idUser != null) {
            axios
                .get(this.baseUrl+ '/user?id=' + this.idUser)
                .then(response => {
                    this.dataUser = response.data
                }, (error) => {
                    console.log(error)
                })
        }

    },
} 