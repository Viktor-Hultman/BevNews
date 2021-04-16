import React from 'react';
import { StyledMenu } from './Menu.styled';
import SignOutButton from '../SignOut';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { bool, func  } from 'prop-types';
import {useState} from 'react'

const NavItem = styled.li`
list-style: none;
height: 80px;
display: flex;
align-items: center;
`

export const NavLink = styled(Link)`
  color:${props => props.theme.txt};
  display: flex;
  align-items: center;
`;

const Menu = ({ open, setOpen, authUser }) => {


  return (
    <StyledMenu open={open}  >

      <NavItem>
        <NavLink to={ROUTES.HOME}  onClick={() => setOpen(!open)}>Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={ROUTES.ACCOUNT} onClick={() => setOpen(!open)}>Account</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={ROUTES.SETTINGS} onClick={() => setOpen(!open)}>Settings</NavLink>
      </NavItem>

      {!!authUser.roles[ROLES.ADMIN] && (
        <NavItem>
          <NavLink to={ROUTES.ADMIN} onClick={() => setOpen(!open)}>Admin</NavLink>
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
  setOpen: func.isRequired,
}

export default Menu;