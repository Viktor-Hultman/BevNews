
import React from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';
import styled from 'styled-components';
import SearchWordForm from '../SearchWordForm';
import CountryLangDropdowns from '../Country-Lang';

const SettingsContiner = styled.div`
display:flex;
flex-direction: column;
align-items: center;
text-align: center;
`

const SettingsPage = () => (
    <SettingsContiner>
        <h1>Settings</h1>
        <SearchWordForm />
        <CountryLangDropdowns />
    </SettingsContiner>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(SettingsPage);