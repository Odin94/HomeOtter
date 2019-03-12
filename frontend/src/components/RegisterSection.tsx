import React, { Component } from 'react';
import '../scss/RegisterSection.scss';

import {
    FormGroup, InputGroup, Card, Button, Elevation,
} from "@blueprintjs/core";

interface RegisterSectionProps { }

interface RegisterSectionState {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    submitSuccessful: boolean | null
}

class RegisterSection extends Component<RegisterSectionProps, RegisterSectionState> {

    constructor(props: RegisterSectionProps) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            submitSuccessful: null
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(event: React.FormEvent<HTMLInputElement>) {
        const target = event.currentTarget;

        console.log(`${target.name}: ${target.value}`);

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
            const submitSuccessful = await this.submitForm();
            this.setState({ ...this.state, submitSuccessful });
        }
    };

    validateForm(): boolean {
        return true;
    }

    submitForm(): Promise<boolean> {
        return fetch('/user_api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                passwordHash: this.state.password,
            })
        }).then((response: Response) => {
            return response.status === 200;
        });
    }

    render() {
        return (
            <section id="register-section">
                <Card elevation={Elevation.ONE}>
                    <form onSubmit={this.onSubmit}>
                        <h1>Register</h1>
                        <FormGroup>
                            <InputGroup name="email" value={this.state.email} onChange={this.onInputChange} leftIcon="envelope" id="email-input" placeholder="Email Address" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="firstName" value={this.state.firstName} onChange={this.onInputChange} leftIcon="person" id="firstname-input" placeholder="First Name" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="lastName" value={this.state.lastName} onChange={this.onInputChange} leftIcon="person" id="lastname-input" placeholder="Last Name" />
                        </FormGroup>
                        <FormGroup>
                            <InputGroup name="password" value={this.state.password} onChange={this.onInputChange} leftIcon="lock" id="text-input" placeholder="Password" type="password" />
                        </FormGroup>

                        <Button type="submit" fill>Register</Button>
                    </form>
                </Card>

            </section >
        );
    }
}

export default RegisterSection;