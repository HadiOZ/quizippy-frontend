import axios from 'axios'

export default {
    props: ['id', 'template'],
    data() {
        return {
            baseUrl: process.env.VUE_APP_API,
            idUser: localStorage.getItem('token'),

            infoQuiz: {
                title: '',
                desc: '',
                img: '',
                category: 'Computer',
                code: '',
                point: 100,
                time: '15 sec',
                visibel: 'Public',
            },

            iSelect: 0,
            quiz: [{
                idSoal: 1,
                Img: "",
                Desc: "",
                OpsiA: "",
                OpsiB: "",
                OpsiC: "",
                OpsiD: "",
                Answer: "",
            }],
            needScroll: false,

            wantPick: "",
            pickTitle: "",
            pickList: [],

            listCategory: ['Math', 'Computer', 'Website', 'Android', 'Programming', 'Microcontroller', 'Multimedia', 'Economy', 'Science', 'Art'],
            listPoint: [10, 50, 100, 250],
            listTime: ['10 sec', '15 sec', '20 sec', '25 sec'],
            listVisibel: ['Private', 'Public'],

            listTemplateQuestion:null,
            loadedTemplatePict:0
        }
    },
    updated() {
        if (this.needScroll) {
            const el = this.$el.getElementsByClassName('add')[0];
            if (el) {
                el.scrollIntoView();
            }
            this.needScroll = false
        }
    },
    mounted() {
        var idUser = localStorage.getItem('token')
        console.log(idUser)

        if (idUser == 'null') {
            location.href = '/signin'
        } else if(this.id!=null){ //Edit Quiz
            this.$el.getElementsByClassName('btnDelete')[0].style.visibility = 'visible'
            var url = this.baseUrl + '/quizdetail?id='+this.id
            axios
                .get(url)
                .then(response => {
                     //Temporary Adapt
                    var priv = response.data[0].privacy=='PUB' ? 'Public' : 'Private'

                    console.log(response)
                    this.infoQuiz.title     = response.data[0].title
                    this.infoQuiz.desc      = response.data[0].description
                    this.infoQuiz.img       = response.data[0].picture
                    this.infoQuiz.category  = response.data[0].category
                    this.infoQuiz.code      = response.data[0].id
                    this.infoQuiz.point     = 100
                    this.infoQuiz.time      = response.data[0].duration+' sec'
                    this.infoQuiz.visibel   = priv
                    
                    var listQuestions = response.data[0].questions
                    this.quiz = []
                    for(var i=0; i<listQuestions.length; i++){
                        this.quiz.push({
                            idSoal  : listQuestions[i].id,
                            Img     : listQuestions[i].media,
                            Desc    : listQuestions[i].question,
                            OpsiA   : listQuestions[i].options[0].comment,
                            OpsiB   : listQuestions[i].options[1].comment,
                            OpsiC   : listQuestions[i].options[2].comment,
                            OpsiD   : listQuestions[i].options[3].comment,
                            Answer  : listQuestions[i].answer
                        })
                    }

                    if(this.infoQuiz.img==""){
                        document.getElementById("imgTitle").src = require('@/assets/imgPlaceholder.png')
                    }

                    this.change(0)
                })
        } else if(this.template!=null){ //Use Template
            var urlTemplate = this.baseUrl + '/quizdetail?id='+this.template
            var context = this
            axios
                .get(urlTemplate)
                .then(response => {
                    if(response.data[0].picture==""){
                        document.getElementById("imgTitle").src = require('@/assets/imgPlaceholder.png')
                    } else {
                        //get picture quiz
                        var request = new XMLHttpRequest();
                        request.open('GET', this.baseUrl + '/quizpicture/' + response.data[0].picture, true);
                        request.responseType = 'blob';
                        request.onload = function () {
                            var file = request.response
                            file.lastModifiedDate = new Date();
                            file.name = 'quizImg'
                            console.log(file)
                            context.infoQuiz.img = file

                            var reader = new FileReader();
                            reader.readAsDataURL(context.infoQuiz.img);
                            reader.onload = function (e) {
                                document.getElementById("imgTitle").src = e.target.result
                            };
                        };
                        request.send();
                    }

                     //Temporary Adapt
                     var priv = response.data[0].privacy=='PUB' ? 'Public' : 'Private'

                    this.infoQuiz.title     = response.data[0].title
                    this.infoQuiz.desc      = response.data[0].description
                    this.infoQuiz.category  = response.data[0].category
                    this.infoQuiz.code      = response.data[0].id
                    this.infoQuiz.point     = 100
                    this.infoQuiz.time      = response.data[0].duration+' sec'
                    this.infoQuiz.visibel   = priv
                    
                    //Quiz Question
                    this.listTemplateQuestion = response.data[0].questions
                    this.quiz = []
                    for(var i=0; i<this.listTemplateQuestion.length; i++){
                        var question = this.listTemplateQuestion[i]
                        context.quiz.push({
                            idSoal  : question.id,
                            Img     : '',
                            Desc    : question.question,
                            OpsiA   : question.options[0].comment,
                            OpsiB   : question.options[1].comment,
                            OpsiC   : question.options[2].comment,
                            OpsiD   : question.options[3].comment,
                            Answer  : question.answer
                        })
                    }
                    this.getPictQuestionFile()

                    this.change(0)
                })
        } else { //Blank Quiz
            document.getElementById("imgTitle").src = require('@/assets/imgPlaceholder.png')
        }
    },
    
    methods: {
        getPictQuestionFile(){
            var context = this
            if (this.listTemplateQuestion[this.loadedTemplatePict].media != '') {
                var request2 = new XMLHttpRequest();
                request2.open('GET', this.baseUrl + '/questmedia/' + this.listTemplateQuestion[this.loadedTemplatePict].media, true);
                request2.responseType = 'blob';
                request2.onload = function () {
                    var file = request2.response
                    file.lastModifiedDate = new Date();
                    file.name = 'questionImg'
                    context.quiz[context.loadedTemplatePict].Img = file
                    ++context.loadedTemplatePict
                    if (context.loadedTemplatePict < context.listTemplateQuestion.length) {
                        context.getPictQuestionFile()
                    } else {
                        context.change(0)
                    }
                };
                request2.send();
            } else {
                ++this.loadedTemplatePict
                if (this.loadedTemplatePict < this.listTemplateQuestion.length) {
                    this.getPictQuestionFile()
                } else {
                    this.change(0)
                }
            }
        },

        browseImg(key) {
            switch (key) {
                case 'title':
                    this.$refs.fileTitle.click();
                    break;
                case 'soal':
                    this.$refs.fileSoal.click();
                    break;
            }
        },

        showPick(wantPick) {
            this.wantPick = wantPick
            switch (wantPick) {
                case 'category':
                    this.pickTitle = 'Chose Category'
                    this.pickList = this.listCategory
                    break;

                case 'point':
                    this.pickTitle = 'Chose Point'
                    this.pickList = this.listPoint
                    break;

                case 'time':
                    this.pickTitle = 'Chose Time'
                    this.pickList = this.listTime
                    break;

                case 'visibel':
                    this.pickTitle = 'Chose Visibility'
                    this.pickList = this.listVisibel
                    break;
            }
            this.$refs.modalPick.show()
        },

        pick(index) {
            switch (this.wantPick) {
                case 'category':
                    this.infoQuiz.category = this.pickList[index]
                    break;

                case 'point':
                    this.infoQuiz.point = this.pickList[index]
                    break;

                case 'time':
                    this.infoQuiz.time = this.pickList[index]
                    break;

                case 'visibel':
                    this.infoQuiz.visibel = this.pickList[index]
                    break;
            }
            this.$refs.modalPick.hide()
        },

        savePictTitle: function (e) {
            this.infoQuiz.img = e.target.files[0]
            console.log(this.infoQuiz.img)
            var reader = new FileReader();
            reader.readAsDataURL(this.infoQuiz.img);
            reader.onload = function (e) {
                document.getElementById("imgTitle").src = e.target.result
            };
        },

        savePictSoal: function (e) {
            this.quiz[this.iSelect].Img = e.target.files[0]
            this.changePict()
        },

        changePict() {
            var pict = this.quiz[this.iSelect].Img
            if(pict==""){
                document.getElementById("imgSoal").src = require('@/assets/imgPlaceholder.png')
            } else if(typeof(pict)=="object"){
                var reader = new FileReader();
                reader.readAsDataURL(pict);
                reader.onload = function (e) {
                document.getElementById("imgSoal").src = e.target.result
                }
            } else if(typeof(pict)=="string"){
                document.getElementById("imgSoal").src = this.baseUrl+'/questmedia/'+pict
            }
        },

        add() {
            var lastId = this.quiz[this.quiz.length - 1].idSoal
            if(this.id==null){
                this.quiz.push({
                    idSoal: parseInt(lastId) + 1,
                    Img: "",
                    Desc: "",
                    OpsiA: "",
                    OpsiB: "",
                    OpsiC: "",
                    OpsiD: "",
                    Answer: "",
                })
                this.iSelect = this.quiz.length - 1
                this.changePict()
                this.needScroll = true
            } else {
                //insert question 
                var idSoal = parseInt(lastId) + 1
                axios.post(this.baseUrl + '/addquestion?id=' + idSoal + '&quizid=' + this.id, {
                        "options": [{
                                "symbol": "A",
                                "comment": ""
                            },
                            {
                                "symbol": "B",
                                "comment": ""
                            },
                            {
                                "symbol": "C",
                                "comment": ""
                            },
                            {
                                "symbol": "D",
                                "comment": ""
                            }
                        ]
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            this.quiz.push({
                                idSoal: idSoal,
                                Img: "",
                                Desc: "",
                                OpsiA: "",
                                OpsiB: "",
                                OpsiC: "",
                                OpsiD: "",
                                Answer: "",
                            })
                            this.iSelect = this.quiz.length - 1
                            this.changePict()
                            this.needScroll = true
                        }
                    }, (error) => {
                        console.log(error)
                    })
            }
        },

        change(index) {
            console.log(this.quiz)
            this.iSelect = index
            this.changePict()
        },

        deleteSoal(index) {
            if(this.id==null){
                this.removeSoal(index)
            } else {
                var idSoal = this.quiz[index].idSoal
                axios.delete(this.baseUrl + '/deletequestion?id=' + idSoal + '&quizid=' + this.id)
                    .then(() => {
                        this.removeSoal(index)
                    }, (error) => {
                        console.log(error)
                    })
            }
        },

        removeSoal(index) {
            event.cancelBubble = true;
            if (index == this.quiz.length - 1) {
                --this.iSelect
            }
            this.quiz.splice(index, 1)
            this.change(this.iSelect)
        },

        validateSave(){
            if(this.infoQuiz.title.length==0){
                this.$refs.modalValidateTitle.show()
            }else if(this.infoQuiz.desc.length==0){
                this.$refs.modalValidateDesc.show()
            }else {
                if(this.id==null){
                    this.insertQuiz()
                } else {
                    this.updateQuiz()
                }
            }
        },
       
        insertQuiz(){
            var listQuestions = []
            for (var i = 0; i < this.quiz.length; i++) {
                listQuestions.push({
                    question: this.quiz[i].Desc,
                    answer: this.quiz[i].Answer,
                    "options": [{
                            "symbol": "A",
                            "comment": this.quiz[i].OpsiA
                        },
                        {
                            "symbol": "B",
                            "comment": this.quiz[i].OpsiB
                        },
                        {
                            "symbol": "C",
                            "comment": this.quiz[i].OpsiC
                        },
                        {
                            "symbol": "D",
                            "comment": this.quiz[i].OpsiD
                        }
                    ]
                })
            }
            
            //Temporary Adapt
            var priv = this.infoQuiz.visibel=='Public' ? 'PUB' : 'PRIV'

            axios.post(this.baseUrl + '/createquiz', {
                id          : this.id,
                author      : this.idUser,
                title       : this.infoQuiz.title,
                description : this.infoQuiz.desc,
                category    : this.infoQuiz.category,
                duration    : this.extractNum(this.infoQuiz.time),
                privacy     : priv,
                questions   : listQuestions
            })
            .then((response) => {
                if(response.status==200){
                    this.insertPict(response.data)
                }
            },(error) => {
                console.log(error)
            })
        },

        updateQuiz(){
            //Temporary Adapt
            var priv = this.infoQuiz.visibel=='Public' ? 'PUB' : 'PRIV'

            axios.post(this.baseUrl + '/editquiz?id='+this.id, {
                title       : this.infoQuiz.title,
                description : this.infoQuiz.desc,
                category    : this.infoQuiz.category,
                duration    : this.extractNum(this.infoQuiz.time),
                privacy     : priv
            })
            .then((response) => {
                if(response.status==200){
                    this.updateSoal()
                }
            },(error) => {
                console.log(error)
            })
        },
        
        updateSoal(){
            var updateCount = 0
            for(var i = 0; i<this.quiz.length; i++){
                var quiz = this.quiz[i]
                axios.post(this.baseUrl+'/editquestion?id='+quiz.idSoal+'&quizid='+this.id, {
                    question: quiz.Desc,
                    answer: quiz.Answer,
                    "options": [
                        {
                            "symbol": "A",
                            comment: quiz.OpsiA
                        },
                        {
                            "symbol": "B",
                            comment: quiz.OpsiB
                        },
                        {
                            "symbol": "C",
                            comment: quiz.OpsiC
                        },
                        {
                            "symbol": "D",
                            comment: quiz.OpsiD
                        }
                    ]
                })
            .then((response) => {
                if(response.status==200){
                    ++updateCount
                    if (updateCount == this.quiz.length) {
                        this.insertPict(this.id)
                    }
                }
            },(error) => {
                console.log(error)
            })
            }
        },

        extractNum(str) {
            var matches = str.match(/(\d+)/); 
            return parseInt(matches[0])
        },

        insertPict(idQuiz){
            if (typeof(this.infoQuiz.img)=="object") {
                let formData = new FormData()
                formData.append('file', this.infoQuiz.img);

                axios.post(this.baseUrl + '/uploadqp?id=' + idQuiz, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            this.insertPictSoal(idQuiz)
                        }
                    }, (error) => {
                        console.log(error)
                    })
            } else {
                this.insertPictSoal(idQuiz)
            }
        },

        insertPictSoal(idQuiz){
            var needUpload = false
            
            let formData = new FormData()
            for(var i=0; i<this.quiz.length; i++){
                var img = this.quiz[i].Img
                if(typeof(img)=="object"){
                    needUpload = true
                    formData.append(this.quiz[i].idSoal, img)
                    console.log(this.quiz[i].idSoal)
                }
            }
            
            if(needUpload){
                axios.post(this.baseUrl + '/uploadqm?quizid=' + idQuiz, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            location.href = '/dashboard'
                        }
                    }, (error) => {
                        console.log(error)
                    })
            } else {
                location.href = '/dashboard'
            }
        },

        deleteQuiz(){
            axios.delete(this.baseUrl + '/deletequiz?id='+this.id)
            .then((response) => {
                if(response.status==200){
                    location.href='/dashboard'
                }
            },(error) => {
                console.log(error)
            })
        }
    },
}