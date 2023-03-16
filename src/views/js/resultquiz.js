import Card from '../../components/CardResult.vue'

export default {
    components: {
      'card' : Card
    }, 
    data() {
      return {
        cards : {
            title : "",
            category : '',
            creator : {
              name : "",
              link : ""
            },
            part : {
              summary : 1,
              detail : [
                {
                  profil : {
                    link : "../assets/profile-icon.png",
                    name : "nama 1"
                  },
                  status : "status 1",
                  score : "score 1",
                  poin : "poin 1",
                  rank : "rank 1"
                },
                {
                  profil : {
                    link : "../assets/profile-icon.png",
                    name : "nama 2"
                  },
                  status : "status 2",
                  score : "score 2",
                  poin : "poin 2",
                  rank : "rank 2"
                },
                {
                  profil : {
                    link : "../assets/profile-icon.png",
                    name : "nama 3"
                  },
                  status : "status 3",
                  score : "score 3",
                  poin : "poin 3",
                  rank : "rank 3"
                },
                {
                  profil : {
                    link : "../assets/profile-icon.png",
                    name : "nama 4"
                  },
                  status : "status 4",
                  score : "score 4",
                  poin : "poin 4",
                  rank : "rank 4"
                },
                 {
                  profil : {
                    link : "../assets/profile-icon.png",
                    name : "nama 5"
                  },
                  status : "status 5",
                  score : "score 5",
                  poin : "poin 5",
                  rank : "rank 5"
                }
              ]
            }
  
          }
      }
    }
  }