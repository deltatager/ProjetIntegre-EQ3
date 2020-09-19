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
        return sessionStorage.getItem("authenticatedUser") != null  
    }

    getValueFromSession(key) {
        return sessionStorage.getItem(key)
    }

    logout(){
        sessionStorage.removeItem("authenticatedUser")
    }

    saveValueToSession(key, value) {
        sessionStorage.setItem(key, value)
    }


}

export default new AuthenticationRegistrationService()