
export default
 {
    data(){
        return{
            user : {
                email : null,
                password : null,
            },
            login: false,
            key : 'AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
            errorDiv : false,
            passwordErrorone : false,
            emailError : false,
            passwordErrorone: false,
            undo:[],
            completeDiv : false
        }
    },
    methods : {
        onSubmit(){
           let loggedin = false
            if(this.undo[0] == 'continue' && this.undo[1] == 'continue' ){
                let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
                if(this.logging){ 
                    authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
                }
                axios.post(
                    authLink+'AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
                    { email: this.email , password:this.password , returnSecureToken : true}        
                ).then(response =>{
                    if(response.data.registered == true){
                        this.$store.state.token = response.data.idToken
                        this.$store.state.Email= response.data.email 
                        this.$store.state.LocalID = response.data.localId
                        console.log(response.data);
                        localStorage.setItem("token",this.$store.state.token)
                        localStorage.setItem("Email",this.$store.state.Email)
                        localStorage.setItem("localId",this.$store.state.LocalID)
                        this.$router.push('/browse')
                        loggedin = true
                    }
                })
                setTimeout(()=>{
                        if(loggedin == false){
                            this.errorDiv = true
                            this.passwordError = true
                        }
                },1000)
             
            }
                 
        },
        login(){
            
            if(this.undo[0] == 'continue' && this.undo[1] == 'continue' ){
                
                var authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
                axios.post(
                    authLink+'AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
                    { email: this.email , password:this.password , returnSecureToken : true}        
                ).then(response =>{
                    if(response.data.idToken != ''){
                        this.login = !this.logging
                        this.completeDiv = true
                        setTimeout(()=>{
                            this.completeDiv = false
                            this.errorDiv = false
                            this.passwordError = false
                        },3000)
                    }
                })
                setTimeout(()=>{
                if(this.completeDiv == false){
                 
                    this.errorDiv=true
                    this.passwordError = true
                 
                }
                },1000)
            }
        },
    },
    mounted(){
        document.querySelector('.header').style.display ='none'
    },
    created(){
        if(this.$store.state.createEmail !== null){
            this.email = this.$store.state.createEmail
        }
    },
    watch:{
        "email"(){
            function emailIsValid (email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            }
           if(emailIsValid(this.email)){
               this.emailError = false
               this.errorDiv = false
               this.undo[0] = 'continue'
           }else{
               this.emailError = true
               this.errorDiv = true
           }
        },
        "password"(){
            if(this.password == null || this.password.length <6){
                this.errorDiv = true
                this.passwordErrorFirst = true
            }
            if(this.password.length >=6){
                this.passwordErrorFirst= false
                this.errorDiv = false
                this.undo[1] = 'continue'
            }
        },
        "login"(){
            this.errorDiv = false    
            this.passwordError = false
            this.emailError = false
            this.passwordErrorFirst = false
        }

    }

};