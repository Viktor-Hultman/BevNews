import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LandingGraph from '../LandingGraph';
import * as ROUTES from '../../constants/routes';

const SignInButton = styled.button`
    background-color: #263238;
    border: 2px solid #263238;
    color: #fff;
    padding: 5px;
    width: 200px;
    height: 100px;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 3px;
`

// const BiggerSignInButton = styled(SignInButton)`
// height: 80px;
// `

const ButtonLink = styled(Link)`
text-decoration: none;
color: #fff;
text-transform: uppercase;
width: 100%;
`

const LandingDiv = styled.div`
display: flex;
flex-direction: column;
background: #DCE7FA;
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
background: #DCE7FA;
`

const Landing = (props) => {

    const {history} = props;

    const SignInFunc = () => {
        history.push(ROUTES.SIGN_IN);
    }

    return(
        <LandingDiv>
            <h1>Landing</h1>
            <h1>BEV</h1>
            <SignInButton onClick={SignInFunc}>
                SIGN IN
            </SignInButton>
            <ExampleGraphDiv>
                <LandingGraph />
            </ExampleGraphDiv>
        </LandingDiv>
    )
};

export default withRouter(Landing);

