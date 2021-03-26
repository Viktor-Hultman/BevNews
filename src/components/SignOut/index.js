import React from 'react';
import { withFirebase } from '../Firebase';
import { NavLink } from '../BurgerMenu/Menu'
import * as ROUTES from '../../constants/routes';
import { GoSignOut } from 'react-icons/go';
import styled from 'styled-components';



const SignOutButton = ({ firebase }) => (

    <NavLink to={ROUTES.SIGN_IN} onClick={firebase.doSignOut}>
        Sign Out <GoSignOut />
    </NavLink>
);

export default withFirebase(SignOutButton);