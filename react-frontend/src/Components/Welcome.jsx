import React, { Component } from 'react';
import AuthenticationRegistrationService from '../js/AuthenticationRegistrationService';

class Welcome extends Component {
    render() {
        return (
            <div>
                <h1>Welcome, {JSON.parse(AuthenticationRegistrationService.getValueFromSession("authenticatedUser")).username}!</h1>
            </div>
        );
    }
}

export default Welcome