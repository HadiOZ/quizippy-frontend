import NavDashboard from '@/components/NavDashboard.vue'

export default {
  components: {
    NavDashboard,
  },

  data() {
    return {
      value: 21,
      max: 40,

      listHistory: [{
          img: 'quiz2.png',
          title: 'Javascript',
          category: 'Website',
          correct: 23,
          total: 40,
          done: 25,
          author: 'Adnan'
        },
        {
          img: 'quiz4.png',
          title: 'Mengenal Komputer',
          category: 'Computer',
          correct: 19,
          total: 20,
          done: 20,
          author: 'Adnan'
        }
      ]
    }
  },

  mounted() {
    var idUser = localStorage.getItem('token')

    if (idUser == 'null') {
      location.href = '/signin'
    }
  },

  methods: {
    isFinished(done, total) {
      if (done == total) {
        return 'Finished'
      } else {
        return 'Not yet'
      }
    }
  }
}