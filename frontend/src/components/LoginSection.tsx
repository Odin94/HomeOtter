import React, { Component } from 'react';
import '../scss/LoginSection.scss';

import {
    FormGroup, InputGroup, Card, Button, Elevation, Toaster, Toast, Intent,
} from "@blueprintjs/core";

interface LoginSectionProps {
    csrfToken: string
}

interface LoginSectionState {
    email: string,
    password: string,
    loginSuccessful: boolean | null,
    csrfToken: string
}

class LoginSection extends Component<LoginSectionProps, LoginSectionState> {

    constructor(props: LoginSectionProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginSuccessful: null,
            csrfToken: props.csrfToken
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
        this.setState({ ...this.state, loginSuccessful: null });
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
                    console.log(body);
                });

            console.log(response);

            return response.status === 200;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    render() {
        return (
            <section id="login-section">
                <Card elevation={Elevation.ONE}>
                    <form onSubmit={this.onSubmit}>
                        <h1>Login</h1>
                        <FormGroup>
                            <InputGroup name="email" value={this.state.email} onChange={this.onInputChange} leftIcon="envelope" id="email-input" placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="password" value={this.state.password} onChange={this.onInputChange} leftIcon="lock" id="text-input" placeholder="Password" type="password" />
                        </FormGroup>

                        <Button type="submit" fill>Login</Button>
                    </form>
                </Card>

                {this.state.loginSuccessful === true && (
                    <Toaster><Toast message="Login successful!" intent={Intent.SUCCESS} onDismiss={this.onToastDismissed} timeout={3000} /></Toaster>
                )}
                {this.state.loginSuccessful === false && (
                    <Toaster><Toast message="Login failed!" intent={Intent.DANGER} onDismiss={this.onToastDismissed} timeout={3000} /></Toaster>
                )}
            </section >
        );
    }
}

export default LoginSection;