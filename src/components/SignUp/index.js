import React, { Component } from 'react'; 
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components';
import { StyledInput, StyledButton } from '../SearchWordForm';

export const SignUpContainter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`
export const SignUpFormContainer = styled.form `
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const SignUpButton = styled(StyledButton)`
background-color: #c4c4c4;
`

const SignUpPage = () => (
    <SignUpContainter>
        <h1>SignUp</h1>
        <SignUpForm />
    </SignUpContainter>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    searchWords: '',
    searchWord1: '',
    searchWord2: '',
    searchWord3: '',
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    
    onSubmit = event => {
        const { username, email, passwordOne, searchWords } = this.state;

        const roles = {};
        const settings = {};

        if (searchWords) {
        let searchWordList = searchWords.split(',');
        // "hej,alla,glada".split(',') -> ['hej', 'alla', 'glada']
        let searchWordsArr = searchWordList.map(item => ({ [item]: true })); 
    
        // [{google: true},{apple: true}] -> {apple: true, google: true}
        let searchWordsObject = Object.assign(...searchWordsArr)
        console.log(searchWordsObject)
        settings.searchWords = searchWordsObject
        } 

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                .user(authUser.user.uid)
                .set({
                    username,
                    email,
                    roles,
                    settings
                });
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    onClick = event => {
        const {searchWords, searchWord1, searchWord2, searchWord3} = this.state;
        this.setState({searchWords: searchWord1 + ',' + searchWord2 + ',' + searchWord3})
        console.log(searchWords)
    };


    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            searchWord1,
            searchWord2,
            searchWord3
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            searchWord1 === '' ||
            searchWord2 === '' ||
            searchWord3 === '';

        return (
            <SignUpFormContainer onSubmit={this.onSubmit}>
                <StyledInput
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                    maxLength="20" 
                />
                <StyledInput
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                /> 
                <StyledInput
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                /> 
                <StyledInput
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <StyledInput
                    name="searchWord1"
                    value={searchWord1}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter a searchword"
                />
                <StyledInput
                    name="searchWord2"
                    value={searchWord2}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter a searchword"
                />
                <StyledInput
                    name="searchWord3"
                    value={searchWord3}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter a searchword"
                />
               
                <SignUpButton disabled={isInvalid} type="submit" onClick={this.onClick}>Sign Up</SignUpButton>
                {error && <p>{error.message}</p>}
                <p>Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
            </SignUpFormContainer>);
    }
}

const SignUpLink = () => (
<p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
