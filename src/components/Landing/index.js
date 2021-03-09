

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as ROUTES from '../../constants/routes';

const SignInButton = styled.button`
width: 80px;
height: 28px;
border-radius: 10px;
background: #C4C4C4;
`

const ButtonLink = styled(Link)`
text-decoration: none;
color: black;
`

const LandingDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;
height: 100%;

`

const ExampleGraphDiv = styled.div`
width: 100%;
height: 100vh;
background: #CCCCCC;
margin-top: 50px;

`

const Landing = () => (
    <LandingDiv>
        <h1>Landing</h1>
        <p></p>
        <SignInButton><ButtonLink to={ROUTES.SIGN_IN}>Sign In</ButtonLink></SignInButton>
        <ExampleGraphDiv>
        </ExampleGraphDiv>
    </LandingDiv>
);

export default Landing;

