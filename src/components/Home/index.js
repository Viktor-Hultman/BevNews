import React from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import Dashboard from '../Dashboard';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';




const HomePage = () => (
    <div>
        {/* The themeprovider links themes to all components inside of it */}
        {/* Both the ThemeProviderHook and the ThemeProvider is needed */}
        <ThemeProviderHook />
        <ThemeProvider theme={OuterColorTheme}>
            <h1>Home Page</h1>
            <p>The Home Page is accessible by every signed in user.</p>
            <Dashboard />
        </ThemeProvider>
    </div>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);