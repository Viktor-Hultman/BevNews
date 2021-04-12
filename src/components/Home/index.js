import React from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import Dashboard from '../Dashboard';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';

export const WebsiteBackground = styled.div`
background: ${props => props.theme.websitebg};
min-height: 100vh;
color: ${props => props.theme.txt};
`


const HomePage = () => (
    <WebsiteBackground>

        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Dashboard />

    </WebsiteBackground>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);