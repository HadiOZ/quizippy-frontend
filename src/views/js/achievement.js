import NavDashboard from '@/components/NavDashboard.vue'

export default {
    components: {
        NavDashboard,
    },

    data(){
        return {
            listAchieve: [{
                img: 'quiz1.png',
                title: 'HTML & CSS',
                category: 'Website',
                correct: 9,
                total: 10,
                rank: '1st'
            },
            {
                img: 'quiz8.png',
                title: 'Flex Box',
                category: 'Website',
                correct: 18,
                total: 20,
                rank: '3rd'
            },
            {
                img: 'quiz11.png',
                title: 'Kotlin',
                category: 'Android',
                correct: 23,
                total: 25,
                rank: '2nd'
            },
            {
                img: 'quiz7.png',
                title: 'PHP',
                category: 'Website',
                correct: 35,
                total: 40,
                rank: '3rd'
            },
            {
                img: 'quiz2.png',
                title: 'Javascript',
                category: 'Website',
                correct: 39,
                total: 40,
                rank: '1st'
            }]
        }
    },

    mounted() {
        var idUser = localStorage.getItem('token')

        if(idUser=='null'){
            location.href='/signin'
        }
    },

    methods: {
        copyLink() {
            let testingCodeToCopy = document.querySelector('#shareurl')
            testingCodeToCopy.setAttribute('type', 'text') // 不是 hidden 才能複製
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Success' : 'Fail';
                this.$bvToast.toast(`Copied to clipboard`, {
                    title: msg,
                    toaster: 'b-toaster-top-right',
                    solid: true,
                    appendToast: false,
                    autoHideDelay: 1000
                })
            } catch (err) {
                //('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()

            this.$refs.modalShare.hide()
        }
    }
}