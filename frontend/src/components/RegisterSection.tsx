import React, { Component } from 'react';
import '../scss/RegisterSection.scss';

import {
    FormGroup, InputGroup, Card, Button, Elevation, Toaster, Toast, Intent,
} from "@blueprintjs/core";
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router';

interface RegisterSectionProps {
    cookies?: Cookies
}

interface RegisterSectionState {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    registerSuccessful: boolean | null,
    csrfToken: string,
    shouldRedirect: boolean
}

class RegisterSection extends Component<RegisterSectionProps, RegisterSectionState> {

    constructor(props: RegisterSectionProps) {
        super(props);
        const { cookies } = props;

        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            registerSuccessful: null,
            csrfToken: cookies!!.get('XSRF-TOKEN'),
            shouldRedirect: false,
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onToastDismissed = this.onToastDismissed.bind(this);
    }

    onInputChange(event: React.FormEvent<HTMLInputElement>) {
        const target = event.currentTarget;

        if (["email", "firstName", "lastName", "password"].includes(target.name)) {
            // @ts-ignore
            this.setState({
                [target.name]: target.value
            });
        } else {
            console.log(`Can't assign name "${target.name}" to form.`);
        }
    }

    onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (this.validateForm()) {
            const registerSuccessful = await this.submitForm();
            this.setState({ ...this.state, registerSuccessful });
        }
    }

    onToastDismissed() {
        this.setState({ ...this.state, registerSuccessful: null, shouldRedirect: this.state.registerSuccessful!! });
    }


    validateForm(): boolean {
        // TODO: implement and give user feedback
        return true;
    }

    async submitForm(): Promise<boolean> {
        try {
            const response = await fetch('/user_api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': this.state.csrfToken,
                },
                body: JSON.stringify({
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    passwordHash: this.state.password,
                })
            });

            return response.status === 200;
        } catch (err) {
            console.log("RegisterError: ", err);
            return false;
        }
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/" />
        }

        return (
            <section id="register-section" className="inside-landing-page-section">
                <Card elevation={Elevation.THREE}>
                    <form onSubmit={this.onSubmit}>
                        <h1>Register</h1>
                        <FormGroup>
                            <InputGroup name="email" value={this.state.email} onChange={this.onInputChange} leftIcon="envelope" id="register-email-input" placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="firstName" value={this.state.firstName} onChange={this.onInputChange} leftIcon="person" id="register-firstname-input" placeholder="First Name" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="lastName" value={this.state.lastName} onChange={this.onInputChange} leftIcon="person" id="register-lastname-input" placeholder="Last Name" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="password" value={this.state.password} onChange={this.onInputChange} leftIcon="lock" id="register-password" placeholder="Password" type="password" />
                        </FormGroup>

                        <Button type="submit" fill>Register</Button>
                    </form>
                </Card>

                {this.state.registerSuccessful && (
                    <Toaster><Toast message="Registration successful! Redirecting.." intent={Intent.SUCCESS} onDismiss={this.onToastDismissed} timeout={1500} /></Toaster>
                )}
                {this.state.registerSuccessful === false && (
                    <Toaster><Toast message="Registration failed!" intent={Intent.DANGER} onDismiss={this.onToastDismissed} timeout={3000} /></Toaster>
                )}
            </section >
        );
    }
}

export default RegisterSection;