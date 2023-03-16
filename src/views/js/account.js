import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data: () => {
        return {
           
            optionsG: [
                { value: 'Man', text: 'Man' },
                { value: 'Woman', text: 'Woman' }
            ],
            optionsJ: [
                { value: 'Students', text: 'Students' },
                { value: 'Teacher', text: 'Teacher' },
                { value: 'Other', text: 'Other' }
            ],
            optionsC: [
                { value: 'Indonesia', text: 'Indonesia' },
                { value: 'Malaysia', text: 'Malaysia' },
                { value: 'Other', text: 'Other' }
            ],
            dataUser: {},
            idUser: localStorage.getItem('token'),
            dataPhotos: '',
            baseUrl: process.env.VUE_APP_API 
        }
    },
    methods: {       
        save() {
            var url = this.baseUrl + '/editprofile?id=' + this.idUser           
            axios
            .post(url, this.dataUser)
            .then(Response => {
                console.log(Response)
                if (typeof(this.dataPhotos)=="object") {
                    this.insertPict()
                }
                Swal.fire({                            
                    icon: 'success',
                    title: 'Data Saved Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })           
            })
            .catch(error => {
                console.log(error)                 
            }) 
        },
        load() {
            var url = this.baseUrl + '/user?id=' + this.idUser
            console.log(url)
            axios
            .get(url)
            .then(Response => {
                this.dataUser = Response.data
                console.log(Response)
                console.log(this.dataUser)
            })
            .catch(err => {
                console.log(err)
            })
        },
        browseImg() {
            this.$refs.fileTitle.click()
        },
        savePictTitle: function (e) {
            this.dataPhotos = e.target.files[0]
            console.log(this.dataPhotos)
            var reader = new FileReader();
            reader.readAsDataURL(this.dataPhotos);
            reader.onload = function (e) {
                document.getElementById("imgTitle").src = e.target.result
            };
        },
        insertPict(){
            let formData = new FormData()
            formData.append('file', this.dataPhotos);
            console.log(this.dataPhotos)
            axios
            .post(this.baseUrl + '/uploadpp?id=' + this.idUser, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error)
            })
        },
        logout(){
            localStorage.setItem('token', null)
            location.href = '/'
        }
    },
    
    mounted() {
        if (this.idUser == 'null') {
            location.href = '/signin'
        } else {
            this.load()
        }       
    }
}