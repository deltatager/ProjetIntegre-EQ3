import axios from 'axios'
class AuthenticationRegistrationService{
    constructor(){
        this.id = 0;
    }
     setupAxiosInterceptors(username, password){

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        this.id = axios.interceptors.request.use(
         
            (config) => {
                config.headers.authorization = basicAuthHeader
                return config
            }
        
        )
     }


    isUserLoggedIn(){
        return sessionStorage.getItem("authenticatedUser") != null  
    }

    getValueFromSession(key) {
        return sessionStorage.getItem(key)
    }

    logout(){
        sessionStorage.removeItem("authenticatedUser")
        axios.interceptors.request.eject(this.id)
    }

    saveValueToSession(key, value) {
        sessionStorage.setItem(key, value)
    }


}

export default new AuthenticationRegistrationService()