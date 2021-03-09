import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as ROUTES from '../../constants/routes';

const SignInButton = styled.button`
width: 100px;
border-radius: 10px;
ltext-decoration: none;
`

const Landing = () => (
    <div>
        <h1>Landing</h1>
        <p></p>
        <SignInButton><Link to={ROUTES.SIGN_IN}>Sign In</Link></SignInButton>
    </div>
);

export default Landing;

