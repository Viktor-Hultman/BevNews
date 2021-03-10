import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


const Nav = styled.nav`
  background: #C4C4C4;
  height: 50px;
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-around;
  list-styel-type: none;
  overflow:hidden;
`;

const NavItem = styled.li`
list-style: none;
`

const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 10px;
  height: 100%;
  
`;



const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                    <NavigationAuth authUser={authUser} />
                ) : (
                        <NavigationNonAuth />
                    )
            }
        </AuthUserContext.Consumer>
    </div>
);


const NavigationAuth = ({ authUser }) => (
    <Nav>
        <NavItem>
            <NavLink to={ROUTES.LANDING}>Landing</NavLink>
        </NavItem>
        <NavItem>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
        </NavItem>

        {!!authUser.roles[ROLES.ADMIN] && (
            <NavItem>
                <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
            </NavItem>
        )}
        
        <NavItem>
            <SignOutButton />
        </NavItem>
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav>
        <NavItem>
            <NavLink to={ROUTES.LANDING}>Landing</NavLink>
        </NavItem>
    </Nav>
);

export default Navigation;
