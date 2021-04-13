import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import {SignUpFormContainer} from '../SignUp';
import styled from 'styled-components';
import { StyledInput, StyledButton } from '../SearchWordForm';

const ChangePassForm = styled(SignUpFormContainer)`
`

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;
        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        return (
            <ChangePassForm onSubmit={this.onSubmit}>
                <StyledInput
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />

                <StyledInput
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />

                <StyledButton disabled={isInvalid} type="submit">
                    Change My Password
                </StyledButton>
                {error && <p>{error.message}</p>}
            </ChangePassForm>
        );
    }
}
export default withFirebase(PasswordChangeForm);