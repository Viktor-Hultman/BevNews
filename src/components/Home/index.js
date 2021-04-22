import React from 'react';

import { withAuthorization } from '../Session';

import Dashboard from '../Dashboard';

import styled, { ThemeProvider } from 'styled-components';

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
        
        <Dashboard />

    </WebsiteBackground>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);