import ExampleGraph from '../Graphs/ExampleGraph'

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as ROUTES from '../../constants/routes';


const SignInButton = styled.button`
width: 80px;
height: 35px;
border-radius: 8px;
background: #C4C4C4;
margin: 20px;
`

// const BiggerSignInButton = styled(SignInButton)`
// height: 80px;
// `

const ButtonLink = styled(Link)`
text-decoration: none;
color: black;
`

const LandingDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;
height: 100vh;
text-align: center;

// By using the ">" symbol, only the direct children instead
// of also targeting grandchildren
& > h1 {
    padding: 20px 10px 20px 10px;
}

& > p {
    padding: 20px;
}
`

const ExampleGraphDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
background: #CCCCCC;

`

const Landing = () => (
    <LandingDiv>
        <h1>Landing</h1>
        <p>
            *Here will some general information about the app be displayed,
             maybe what the consumer can use the app for. As well as describe some features.*  
        </p>
        <SignInButton><p><ButtonLink to={ROUTES.SIGN_IN}>Sign In</ButtonLink></p></SignInButton>
        <ExampleGraphDiv>
            <ExampleGraph />
        </ExampleGraphDiv>
    </LandingDiv>
);

export default Landing;

