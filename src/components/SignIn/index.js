import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import { StyledInput, StyledButton } from '../SearchWordForm'

const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;

`
const StyledSignInForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

`

const SignInPage = () => (
    <SignInContainer>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </SignInContainer>
);
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};
class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password).then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
                <StyledSignInForm onSubmit={this.onSubmit}>
                    <StyledInput
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />

                    <StyledInput
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />

                    <StyledButton disabled={isInvalid} type="submit">
                        Sign In
                    </StyledButton>
                    {error && <p>{error.message}</p>}
                </StyledSignInForm>
        );
    }
}


const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm };
