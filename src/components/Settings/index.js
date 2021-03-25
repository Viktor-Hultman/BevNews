
import React from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import SearchWordForm from '../SearchWordForm';
import CountryLangDropdowns from '../Country-Lang';


const SettingsPage = () => (
    <div>
        <h1>Settings</h1>
        <SearchWordForm />
        <CountryLangDropdowns />
    </div>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(SettingsPage);