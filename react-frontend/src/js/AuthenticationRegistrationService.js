import axios from 'axios'
class AuthenticationRegistrationService{
    setupAxiosInterceptors(username,password){

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
           axios.interceptors.request.use(
               (config) => {
                   config.headers.authorization = basicAuthHeader
               }
           )
     }


     isUserLoggedIn(){
        return sessionStorage.getItem("authenticaredUser") != null  
    }

    getLoggedInUser(){
        return sessionStorage.getItem("authenticaredUser")
    }

    logout(){
        sessionStorage.removeItem("authenticaredUser")
    }

    registerSuccesfulLogin = (username,password) =>{
        sessionStorage.setItem("authenticaredUser",username)
        this.setUpAxiosInterceptors('Basic ' + window.btoa(username + ":" + password))
    }



}

export default new AuthenticationRegistrationService()