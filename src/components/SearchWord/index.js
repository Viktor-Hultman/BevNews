import { render } from '@testing-library/react';
import React from 'react';

import { withFirebase } from '../Firebase';

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