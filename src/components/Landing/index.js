
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LandingGraph from '../LandingGraph';
import * as ROUTES from '../../constants/routes';

const SignInButton = styled.button`
    background-color: #263238;
    border: 2px solid #263238;
    color: #fff;
    padding: 5px;
    width: 90%;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 3px;
    :hover{
        
    }

`

// const BiggerSignInButton = styled(SignInButton)`
// height: 80px;
// `

const ButtonLink = styled(Link)`
text-decoration: none;
color: #fff;
width: 
text-transform: uppercase;

`

const LandingDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
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
background: #fff;

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
            <LandingGraph />
        </ExampleGraphDiv>
    </LandingDiv>
);

export default Landing;

