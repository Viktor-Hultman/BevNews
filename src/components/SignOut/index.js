import React from "react";
import { withFirebase } from "../Firebase";
import { NavLink } from "../Navigation";
import * as ROUTES from "../../constants/routes";
import { GoSignOut } from "react-icons/go";
import styled from "styled-components";



const StyledGoSignOut = styled(GoSignOut)`
    padding: 6px 0 0 5px;
    color:${props => props.theme.txt};
`


const SignOutButton = ({ firebase }) => (

    <NavLink to={ROUTES.SIGN_IN} onClick={firebase.doSignOut}>
      Sign Out <StyledGoSignOut />
    </NavLink>
    
);

export default withFirebase(SignOutButton);
