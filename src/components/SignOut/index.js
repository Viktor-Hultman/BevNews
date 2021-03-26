import React from 'react';
import { withFirebase } from '../Firebase';
import { NavLink } from '../BurgerMenu/Menu'
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({ firebase }) => (
    <NavLink to={ROUTES.SIGN_IN} onClick={firebase.doSignOut}>
        Sign Out
    </NavLink>
);

export default withFirebase(SignOutButton);