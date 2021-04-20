import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import LandingGraph from '../LandingGraph';
import * as ROUTES from '../../constants/routes';
import {StyledButton} from '../SearchWordForm';

const SignInButton = styled(StyledButton)`
    background-color: #185C5E;
    border: 2px solid #185C5E;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 3px;
    padding: 20px;
    margin: 20px;

    :hover {
      border-color: #fff;  
    }
`

const LandingDiv = styled.div`
display: flex;
flex-direction: column;
background: #DCE7FA;
align-items: center;
width: 100%;
height: 100%;
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
background: #DCE7FA;
`

const InfoBox = styled.div`
width: 300px;
padding: 20px;
color: #fff;
background-color: #263238;
border-radius: 5px;
`

const Landing = (props) => {

    const {history} = props;

    const SignInFunc = () => {
        history.push(ROUTES.SIGN_IN);
    }

    return(
        <LandingDiv>
            <h1>BEV</h1>
            <InfoBox>
                <p>This is a app where you as a user can choose up to 3 words to "Follow" and compare the number of times those words are mentioned in "The Guardian" Newspaper!</p>
            </InfoBox>
            <SignInButton onClick={SignInFunc}>
                SIGN IN
            </SignInButton>
            <ExampleGraphDiv>
                <h2>Example of how our graphs are struckured</h2>
                <LandingGraph />
            </ExampleGraphDiv>
        </LandingDiv>
    )
};

export default withRouter(Landing);

