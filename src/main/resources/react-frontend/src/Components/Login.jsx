import { ErrorMessage, Field, Form, Formik } from 'formik';
import React,{Component} from 'react';
class Login extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            firstName  : "",
            lastName : "",
            email : "",
            password  : "",
            passwordConfirm : ""
         }
    }
}
   
 
export default Login;