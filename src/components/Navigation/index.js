import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Burger from "../../components/Burger";
import Menu from "../../components/BurgerMenu";
import { useOnClickOutside } from "../ClosingMenu";
import ThemeProviderHook, { OuterColorTheme } from '../ThemeProvider';

const Nav = styled.nav`
  background: gray;
  height: 50px;
  display: flex;
  margin: 0px;
  padding: 0px;
  justify-content: space-around;
  list-style-type: none;
  overflow: hidden;
`;

const NavItem = styled.li`
  list-style: none;
  display: flex;
`;

const NavLink = styled(Link)`
  color:${props => props.theme.txt};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0px;
  height: 100%;
`;

const TextNavUl = styled.ul`
  display: flex;
  height: 50px;
  justify-content: space-around;

  @media (max-width: 600px){
    display: none; 
  }

  @media (min-width: 600px){
    width: 100%;
  }
`;

const HamburgerDiv = styled.div`
  @media (min-width: 601px){
    display: none; 
  }

`;

const NavContainer = styled.div`
  background: ${props => props.theme.bg};
  height: 50px;
  display: flex;
  text-align: center;
  color: ${props => props.theme.txt};
`;

const SignedInUserNameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px){
    width: 100%; 
  }
`

const SignedInUserNameDivSmallScreen = styled(SignedInUserNameDiv)`

@media (min-width: 601px){
  display: none; 
}
`

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <>
            {/* Everything that is placed here will launch if the user is signed in */}
            {/* The ThemeHook is placed here to be able to take in the authUser prop */}
            <ThemeProviderHook authUser={authUser} />
          </>
        ) : (
          <>
            {/* Everything that is placed here will launch if the user is not signed in */}
            <NavigationNonAuth />
          </>
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

export const NavigationAuth = ({ authUser }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  let username = authUser.username;

  return (
    <NavContainer>
        <SignedInUserNameDivSmallScreen>
          <h3>{username}</h3>
        </SignedInUserNameDivSmallScreen>

      <TextNavUl>
        <SignedInUserNameDiv>
          <h3>{username}</h3>
        </SignedInUserNameDiv>
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
      </TextNavUl>

      <HamburgerDiv>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} authUser={authUser} />
        </div>
      </HamburgerDiv>
    </NavContainer>

    //     <Nav>
    //         <NavItem>
    //             <NavLink to={ROUTES.HOME}>Home</NavLink>
    //         </NavItem>
    //         <NavItem>
    //             <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
    //         </NavItem>
    //         <NavItem>
    //             <NavLink to={ROUTES.SETTINGS}>Settings</NavLink>
    //         </NavItem>

    //         {!!authUser.roles[ROLES.ADMIN] && (
    //             <NavItem>
    //                 <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
    //             </NavItem>
    //         )}

    //         <NavItem>
    //             <SignOutButton />
    //         </NavItem>
    //     </Nav>
  );
};

const NavigationNonAuth = () => (
  <Nav>
    <NavItem>
      <NavLink to={ROUTES.LANDING}>Landing</NavLink>
    </NavItem>
  </Nav>
);

export default Navigation;
