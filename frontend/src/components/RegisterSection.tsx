import React, { Component } from 'react';
import '../scss/RegisterSection.scss';

import {
    FormGroup, InputGroup, Card, Button, Elevation,
} from "@blueprintjs/core";

class RegisterSection extends Component {

    render() {
        return (
            <section id="register-section">
                <Card elevation={Elevation.ONE}>
                    <h1>Register</h1>
                    <FormGroup>
                        <InputGroup leftIcon="envelope" id="email-input" placeholder="Email Address" />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup leftIcon="person" id="firstname-input" placeholder="First Name" />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup leftIcon="person" id="lastname-input" placeholder="Last Name" />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup leftIcon="lock" id="text-input" placeholder="Password" type="password" />
                    </FormGroup>

                    <Button type="submit" fill>Register</Button>
                </Card>

            </section >
        );
    }
}

export default RegisterSection;