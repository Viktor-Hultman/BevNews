import React, { useContext, useState, useRef, useEffect } from "react";
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
import { withFirebase } from '../Firebase';


const NavItem = styled.li`
  list-style: none;
  display: flex;
  padding: 0 10px 0 10px;
`;

const SignOutNavBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  background-color: ${props => props.theme.btnbg};
  height:30px;
  width:200px;
  font-size: 0.5rem;
  color: ${props => props.theme.txtInverted};
  padding:0 2px 0 2px;
  border-radius: 50px;
  border: 1px solid ${props => props.theme.btnbg};

  :hover{
    border-color: ${props => props.theme.txt};
  }

  @media (max-width: 768px){
    display:none;
  }
`

export const NavLink = styled(Link)`
  color:${props => props.theme.txt};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0px;
  height: 100%;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 3px;
  text-transform: uppercase;
  :hover {
    border-bottom: 3px solid ${props => props.theme.btnbg};
    transition: all 0.2s ease-out;
  }
`;

const TextNavUl = styled.ul`
  display: flex;
  height: 50px;
  justify-content: center;

  @media (max-width: 768px){
    display: none; 
  }

  @media (min-width: 600px){
    width: 100%;
  }
`;

const HamburgerDiv = styled.div`
  @media (min-width: 769px){
    display: none; 
  }

`;

const NavContainer = styled.div`
  background: ${props => props.theme.bg};
  height: 50px;
  display: flex;
  text-align: center;
  align-items:center;
  color: ${props => props.theme.txt};
`;

const SignedInUserNameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0 10px 0 10px;
  margin-left: 40px;
  @media (max-width: 768px){
    width: 100%; 
    margin-left: 0;
  }
`

const LogoImg = styled.img`
  width: 50px;
  background-color: ${props => props.theme.card};
`

const LandingNav = styled.div`
  background: #263238;
  color: #fff;
  display: flex;
  height: 50px;
  text-align: center;
  justify-content: center;
`;

const LandingItem = styled(NavItem)`
`;

const LandingLink = styled(NavLink)`
  color: #fff;
  :hover{
      border-bottom: 3px solid #185C5E;
      transition: all 0.2s ease-out;
  }
`;




const Navigation = ({firebase}) => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <>
            {/* Everything that is placed here will launch if the user is signed in */}
            {/* The ThemeHook is placed here to be able to take in the authUser prop */}
            <ThemeProviderHook firebase={firebase} authUser={authUser} />
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

export const NavigationAuth = ({ firebase, authUser }) => {
  const [open, setOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState("https://i.imgur.com/3orcm3Z.png")

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  let username = authUser.username;
  let uid = authUser.uid;



  useEffect(() => {
    const unsubscribe = firebase.user(uid).child('settings').child('logoPreset')
        .on('value', snapshot => {
            if (snapshot) {
                const logoObject = snapshot.val();
                if (logoObject) {
                    let logoValue = Object.values(logoObject)
                    setSelectedLogo(logoValue)                        
                } else {
                    setSelectedLogo("https://i.imgur.com/3orcm3Z.png");
                }
            }
        });
    return () => {
        unsubscribe();
    }
  
  }, []);

  return (
    <NavContainer>
        <SignedInUserNameDiv>
          <LogoImg src={selectedLogo} />
        </SignedInUserNameDiv>
      <TextNavUl>
        <NavItem>
          <NavLink to={ROUTES.HOME}>Dashboard</NavLink>
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
      </TextNavUl>
      <SignOutNavBtn>
        <SignOutButton />
      </SignOutNavBtn>
      <HamburgerDiv>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} authUser={authUser} />
        </div>
      </HamburgerDiv>
    </NavContainer>



  );
};

const NavigationNonAuth = () => (
  <LandingNav>
    <LandingItem>
      <LandingLink to={ROUTES.LANDING}>Landing</LandingLink>
    </LandingItem>
  </LandingNav>

);

export default (withFirebase(Navigation));
