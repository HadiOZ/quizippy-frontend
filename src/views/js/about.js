export default {
    data: () => {
        return {
            form: {
                name: '',
                email: '',
                messageArea: ''
            }
        }
    },
    methods: {
        submit() {
            this.$validator.validateAll().then(result => {
            if (!result) {
                return;
            }
            alert("Form Submitted");
            });
        }
    } 
}