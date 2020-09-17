
import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {Component} from 'react';
import * as yup from 'yup';
import axios from 'axios'
import AuthenticationRegistrationService from '../js/AuthenticationRegistrationService.js'
const shortid = require('shortid');


class RegisterStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber : "",
            address : "",
            username: "",
            password: "",
            passwordConfirm: "",
        }
    }

    componentDidMount = () => {

    }

    onSubmit = (values) => {
        this.setState({
            firstName : values.firstName,
            lastName : values.lastName,
            email: values.email,
            phoneNumber : values.phoneNumber,
            address : values.address,
            username: values.username,
            password: values.password,
            passwordConfirm: values.passwordConfirm
        })

            const bodyRequest = {
               firstName : this.state.firstName,
               lastName : this.state.lastName,
              email : this.state.email,
              phoneNumber : this.state.phoneNumber,
              studentId : shortid.generate(),
              enabled : true,
              role : "student",
              address : this.state.address,
              username : this.state.username,
              password : this.state.password
            }


            console.log(this.state)
            axios.post(`http://localhost:8080/students`,bodyRequest)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
    }



  
    /**(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))  */
    validationSchema =  yup.object()
        .shape({
                firstName : yup.string().trim().min(2,"The first name is too Short should have at least 2 characters").required(),
                lastName : yup.string().trim().min(2).max(30).required(),
                username: yup.string().trim().min(2).max(30).required(),
                email: yup.string().trim().email().required(),
                phoneNumber : yup.string().trim().required(),
                address : yup.string().trim().required(),
                password: yup.string().trim().min(8).required(),
                passwordConfirm: yup.string()
                    .oneOf([yup.ref('password'), null], 'Passwords must match')
            }
        )

    errorBlocks = () => {
        return <div>
            <ErrorMessage name="firstName" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="lastName" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="username" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="email" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="phoneNumber" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="address" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="password" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="passwordConfirm" component="div" className="alert alert-warning"
                          style={{color: 'red'}}/>
        </div>

    }

    formFields = (props) => {
        return <div>
            <fieldset className="form-group">
                <label>First Name : </label>
                <Field style={props.errors.firstName ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="text" name="firstName"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Last name : </label>
                <Field style={props.errors.lastName ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="text" name="lastName"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Username : </label>
                <Field style={props.errors.username ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="text" name="username"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Email : </label>
                <Field style={props.errors.email ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="text" name="email"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Phone Number : </label>
                <Field style={props.errors.tel ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="phone" name="phoneNumber"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Address : </label>
                <Field style={props.errors.address ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="text" name="address"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Password : </label>
                <Field style={props.errors.password ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="password" name="password"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Password Confirmation : </label>
                <Field style={props.errors.passwordConfirm ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="password" name="passwordConfirm"/>
            </fieldset>
        </div>
    }




    render() {
        const initialValuesJson = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
           phoneNumber : "",
           enabled : true,
           role : "",
           address : "",
        }


        return (
            <div>
                <div className="container">
                    <Formik
                         onSubmit={this.onSubmit}
                         validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                        validationSchema={this.validationSchema}
                        initialValues={initialValuesJson}
                    >

                        {/* anonymus method
                        tous les attribu name doivent avoir le meme nom que les variables du  state
                        */
                        }
                        {
                            (props) => (
                                <Form>
                                    {this.errorBlocks()}
                                    {this.formFields(props)}

                                    <button  className="btn btn-success" type="submit">Register
                                        Student
                                    </button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default RegisterStudent;