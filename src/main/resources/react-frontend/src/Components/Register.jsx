import { ErrorMessage, Field, Form, Formik } from 'formik';
import React,{Component} from 'react';
class Register extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            firstName  : "",
            lastName : "",
            email : "",
            username : "" ,
            password  : "",
            passwordConfirm : ""
         }
    }

    componentDidMount = () => {

    }

    onSubmit = (values) => {
      
   }

   

   validate = (values) =>{
    let errors = {}
    if(!values.firstName){
        errors.firstName = "Enter a firstname"
    }else if (values.firstName.length < 2){
        errors.firstName = `The firstname ${values.firstName} is too short should be between 2 and 30 letters `
    }else if (values.firstName.length > 30 ){
        errors.firstName = ` The firstname ${values.firstName} is too long should be between 2 and 30 letters `
    }

    if(!values.lastName){
        errors.lastName = "Enter a lastname"
    }else if (values.lastName.length < 2){
        errors.lastName = `The lastname ${values.lastName} is too short should be between 2 and 30 letters `
    }else if (values.lastName.length > 30 ){
        errors.lastName = `The lastname ${values.lastName} is too long should be between 2 and 30 letters `
    }

    if(!values.email){
        errors.email = "Enter an email"
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

        errors.email = ` ${values.email} is an  invalid email address`;
   
      }
    
    if(!values.password){
        errors.password = "Enter a password"
    }
    else if(values.password.length<8){
     errors.password =
      "Password should have at least 8 characters"
    }
    else if(values.password != values.passwordConfirm){
        errors.passwordConfirm = "The password confirmation is not matching the password you entered"
    }



    return errors
}


  

    render() { 

        return (
            <div>
                     <div className = "container">
                    <Formik    
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize={true}
                    initialValues={{  firstName  : "",
                    lastName : "",
                    email : "",
                    password  : "",
                    passwordConfirm : ""}} 
                        >
                     


                        {/* anonymus method
                        tous les attribu name doivent avoir le meme nom que les variables du  state
                        */
                        } 
                        {
                            (props) => (
                                <Form>
                                  
                                    <ErrorMessage   name="firstName" component="div" className="alert alert-warning" style={{ color: 'red'}}/> 
                                    <ErrorMessage name="lastName" component="div" className="alert alert-warning" style={{ color: 'red'}}/>
                                    <ErrorMessage name="email" component="div" className="alert alert-warning" style={{ color: 'red'}}/>
                                    <ErrorMessage name="password" component="div" className="alert alert-warning" style={{ color: 'red'}}/>
                                    <ErrorMessage name="passwordConfirm" component="div" className="alert alert-warning" style={{ color: 'red'}}/>
                       

                                    <fieldset className="form-group">
                                        <label>Firstname : </label>
                                        <Field style={ props.errors.firstName ? {  border: "1px solid tomato" ,borderWidth:"thick"} : {}}  className="form-control" type="text" name="firstName"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Lastname : </label>
                                        <Field style={ props.errors.lastName ? {  border: "1px solid tomato" ,borderWidth:"thick"} : {}} className="form-control" type="text" name="lastName"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Email : </label>
                                        <Field style={ props.errors.email ? {  border: "1px solid tomato" ,borderWidth:"thick"} : {}} className="form-control" type="text" name="email"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Password : </label>
                                        <Field style={ props.errors.password ? {  border: "1px solid tomato" ,borderWidth:"thick"} : {}} className="form-control" type="password" name="password"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Password Confirmation : </label>
                                        <Field style={ props.errors.passwordConfirm ? {  border: "1px solid tomato" ,borderWidth:"thick"} : {}} className="form-control" type="password" name="passwordConfirm"/>
                                    </fieldset>

                                    <button onSubmit={this.onSubmit} className="btn btn-success" type="submit">Register Student</button>
                                </Form>
                            
                            )
                        }
                    </Formik>
            </div>
            </div>
          );
    }
}
 
export default Register;