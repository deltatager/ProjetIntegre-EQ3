
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React,{Component} from 'react';
import AuthenticationRegistrationService from '../js/AuthenticationRegistrationService';
const axios = require('axios');

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            user: {}
        }
    }

    componentDidMount = () => {

    }

    onSubmit = (values) => {
        this.setState({
            username : values.username,
            password : values.password
        });

        console.log(values.username + ":" + values.password);
        console.log(window.btoa(this.state.username + ":" + this.state.password));

        axios({
            method: "GET",
            url: "http://localhost:8080/auth/user",
            headers: {
                authorization: "Basic " + window.btoa(values.username + ":" + values.password)
            }
        }).then((response) => {
            // console.log(response.data)

            this.setState({
                user : response.data
            })

            console.log(this.state.user)

            AuthenticationRegistrationService.saveValueToSession("authenticatedUser", JSON.stringify(this.state.user))
            console.log(JSON.parse(AuthenticationRegistrationService.getValueFromSession("authenticatedUser")).username)
            this.props.history.push("/welcome")
        }).catch((error) => {
            console.log(error)
        })

        // axios({
        //     method: "GET",
        //     url: "http://localhost:8080/auth/basic",
        //     headers: {
        //         authorization: "Basic " + window.btoa(this.state.username + ":" + this.state.password)
        //     }
        // }).then((response) => {
        //     console.log(response);

        //     // AuthenticationRegistrationService.setupAxiosInterceptors(this.state.username, this.state.password)

        //     // console.log(this.props);

        //     // AuthenticationRegistrationService.saveValueToSession("authenticatedUser", this.state.user)
        //     // this.props.history.push("/welcome")
        // }).catch(function (error) {
        //     console.log(error);
        // });
    }


    validate = (values) => {
        let errors = {}
        return errors
    }


    errorBlocks = () => {
        return <div>
            <ErrorMessage name="username" component="div" className="alert alert-warning" style={{color: 'red'}}/>
            <ErrorMessage name="password" component="div" className="alert alert-warning" style={{color: 'red'}}/>
        </div>

    }

    formFields = (props) => {
        return <div>
            <fieldset className="form-group">
                <label>Username : </label>
                <Field style={props.errors.username ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="text" name="username"/>
            </fieldset>

            <fieldset className="form-group">
                <label>Password : </label>
                <Field style={props.errors.password ? {border: "1px solid tomato", borderWidth: "thick"} : {}}
                       className="form-control" type="password" name="password" id="password"/>
            </fieldset>

        </div>
    }


    render() {

        const initialValuesJson = {
            username: "",
            password: ""
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
                                    <button onSubmit={this.onSubmit} className="btn btn-success" type="submit">Login
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
   
 
export default Login;