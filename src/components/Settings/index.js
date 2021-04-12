
import React, { useState, useEffect, useContext } from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import SearchWordForm from '../SearchWordForm';
import ColorPresets from '../ColorPresets';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';
import { WebsiteBackground} from "../Home"





const SettingsContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
text-align: center;
`



const SettingsPage = () => {

    return (
        <WebsiteBackground>

            <SettingsContainer>
                <h1>Settings</h1>
                <SearchWordForm />
                <ColorPresets />
            </SettingsContainer>

        </WebsiteBackground>
    )
};



const condition = authUser => !!authUser;

export default withAuthorization(condition)(SettingsPage);