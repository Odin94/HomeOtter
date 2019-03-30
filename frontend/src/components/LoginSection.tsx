import React, { Component } from 'react';
import '../scss/LoginSection.scss';

import {
    FormGroup, InputGroup, Card, Button, Elevation, Toaster, Toast, Intent,
} from "@blueprintjs/core";
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router';

interface LoginSectionProps {
    cookies?: Cookies
}

interface LoginSectionState {
    email: string,
    password: string,
    loginSuccessful: boolean | null,
    csrfToken: string,
    shouldRedirect: boolean
}

class LoginSection extends Component<LoginSectionProps, LoginSectionState> {

    constructor(props: LoginSectionProps) {
        super(props);
        const { cookies } = props;

        this.state = {
            email: "",
            password: "",
            loginSuccessful: null,
            csrfToken: cookies!!.get('XSRF-TOKEN'),
            shouldRedirect: false,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onToastDismissed = this.onToastDismissed.bind(this);
    }

    onInputChange(event: React.FormEvent<HTMLInputElement>) {
        const target = event.currentTarget;

        if (["email", "password"].includes(target.name)) {
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
            const loginSuccessful = await this.submitForm();
            this.setState({ ...this.state, loginSuccessful });
        }
    }

    onToastDismissed() {
        this.setState({ ...this.state, loginSuccessful: null, shouldRedirect: this.state.loginSuccessful!! });
    }


    validateForm(): boolean {
        // TODO: implement and give user feedback
        return true;
    }

    async submitForm(): Promise<boolean> {
        try {
            const formData = new URLSearchParams();
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);

            const response = await fetch('/user_api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-XSRF-TOKEN': this.state.csrfToken
                },
                body: formData.toString()
            });

            response.text()
                .then((body) => {
                    console.log(`LoginResponseText: ${body}`);
                });

            console.log(`LoginResponse: `, response);

            return response.status === 200;
        } catch (err) {
            console.log(`LoginError: ${err}`);
            return false;
        }
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/" />
        }

        return (
            <section id="login-section" className="inside-landing-page-section">
                <Card elevation={Elevation.THREE}>
                    <form onSubmit={this.onSubmit}>
                        <h1>Login</h1>
                        <FormGroup>
                            <InputGroup name="email" value={this.state.email} onChange={this.onInputChange} leftIcon="envelope" id="login-email-input" placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="password" value={this.state.password} onChange={this.onInputChange} leftIcon="lock" id="login-password" placeholder="Password" type="password" />
                        </FormGroup>

                        <Button type="submit" fill>Login</Button>
                    </form>
                </Card>

                {this.state.loginSuccessful && (
                    <Toaster><Toast message="Login successful! Redirecting.." intent={Intent.SUCCESS} onDismiss={this.onToastDismissed} timeout={1500} /></Toaster>
                )}
                {this.state.loginSuccessful === false && (
                    <Toaster><Toast message="Login failed!" intent={Intent.DANGER} onDismiss={this.onToastDismissed} timeout={3000} /></Toaster>
                )}
            </section >
        );
    }
}

export default LoginSection;