import React from "react";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import styled from "styled-components";


const SignOutNavLink = styled(Link)`
  color:${props => props.theme.txt};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 3px;
  text-transform: uppercase;
  @media (min-width: 769px){
    height: 100%;
  }
`

const StyledGoSignOut = styled(GoSignOut)`
    padding: 6px 0 0 5px;
    color:${props => props.theme.txt};
`


const SignOutButton = ({ firebase }) => (

    <SignOutNavLink to={ROUTES.SIGN_IN} onClick={firebase.doSignOut}>
      Sign Out <StyledGoSignOut />
    </SignOutNavLink>
    
);

export default withFirebase(SignOutButton);
