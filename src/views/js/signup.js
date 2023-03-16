import axios from 'axios'
import Swal from 'sweetalert2'


export default {
  data: () => {
    return {
        api: process.env.VUE_APP_API,
        form: {
          name: '',
          birthdate: '',
          email: '',
          password: '',
          cPassword: ''
        }
    }
  },
  methods: {
    register() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        axios
        .post(this.api + '/signup', this.form)
        .then(Response => {         
          let token = Response.data;
          console.log(Response)
          localStorage.setItem('token', token);
          Swal.fire({                            
            icon: 'success',
            title: 'Sign Up Success',
            html: 'You will be redirected to the <b>sign in</b> page',
            showConfirmButton: false,
            timer: 3000
        })
        .then(() => {
          location.href='/signin'
        })          
        })
        .catch(error => console.log(error))                      
      });   
    }
  }
}