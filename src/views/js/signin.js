import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'signin',
    data: () => {
        return {
            api : process.env.VUE_APP_API,
            input: {
                email: "",
                password: "",
            }
        }
    },
    methods: {
        login() {
            console.log(this.api)
            if(this.input.email != "" && this.input.password != "") {
                    axios
                    .post(this.api + '/signin', this.input)
                    .then(Response => {              
                        let token = Response.data;

                        console.log(Response);       
                        localStorage.setItem('token', token);
            
                        Swal.fire({                            
                            icon: 'success',
                            title: 'Login Success',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        .then(() => {
                            this.$router.push('/dashboard');
                        })                       
                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'The username and / or password is incorrect!'
                        })
                        console.log("The username and / or password is incorrect"); 
                    }) 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'A username and password must be present!'
                })
                console.log("A username and password must be present");
            }                    
        }
    } 
}