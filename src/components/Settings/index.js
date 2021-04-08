
import React from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';
import styled from 'styled-components';
import SearchWordForm from '../SearchWordForm';
import ColorPresets from '../ColorPresets';
import { ThemeProvider } from 'styled-components';





const SettingsContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
text-align: center;
`

const SettingsPage = () => (
        <SettingsContainer>
            <h1>Settings</h1>
            <SearchWordForm />
            <ColorPresets />
        </SettingsContainer>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(SettingsPage);