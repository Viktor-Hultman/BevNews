
import React, { useState, useEffect, useContext } from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import SearchWordForm from '../SearchWordForm';
import ColorPresets from '../ColorPresets';
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';
import styled, { ThemeProvider } from 'styled-components';
import { WebsiteBackground} from "../Home";
import { PageTitle } from '../Account';





const SettingsContainer = styled.div`
color: ${props => props.theme.txt};

`



const SettingsPage = () => {

    return (
        <WebsiteBackground>
            <PageTitle>Settings</PageTitle>
            <SettingsContainer>
                <SearchWordForm />
                <ColorPresets />
            </SettingsContainer>

        </WebsiteBackground>
    )
};



const condition = authUser => !!authUser;

export default withAuthorization(condition)(SettingsPage);