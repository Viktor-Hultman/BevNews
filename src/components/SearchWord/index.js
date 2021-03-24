
import React from 'react';

import { withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import SearchWordForm from '../SearchWordForm';


const SearchWordPage = () => (
    <div>
        <h1>SearchWord</h1>
        <SearchWordForm />


    </div>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(SearchWordPage);