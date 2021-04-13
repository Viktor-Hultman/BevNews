import React from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import Dashboard from '../Dashboard';
// import Dashboard from '../ArrayAttempt-dashboard';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';
import { PageTitle } from '../Account'

export const WebsiteBackground = styled.div`
background: ${props => props.theme.websitebg};
min-height: 100vh;
color: ${props => props.theme.txtInverted};
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
padding-top: 40px;
`


const HomePage = () => (
    <WebsiteBackground>

        <PageTitle>Home Page</PageTitle>
        <p>The Home Page is accessible by every signed in user.</p>
        <Dashboard />

    </WebsiteBackground>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);