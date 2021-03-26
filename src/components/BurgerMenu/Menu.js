import React from 'react';
import { StyledMenu } from './Menu.styled';
import SignOutButton from '../SignOut';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { bool } from 'prop-types';


const NavItem = styled.li`
list-style: none;
height: 90px;
`

export const NavLink = styled(Link)`
  color: #000;
`;

const Menu = ({ open, authUser }) => {
  return (
    <StyledMenu open={open}>

      <NavItem>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={ROUTES.SETTINGS}>Settings</NavLink>
      </NavItem>

      {!!authUser.roles[ROLES.ADMIN] && (
        <NavItem>
          <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
        </NavItem>
      )}

      <NavItem>
        <SignOutButton />
      </NavItem>

    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;