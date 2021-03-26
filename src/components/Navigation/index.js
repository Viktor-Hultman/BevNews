import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthUserContext } from '../Session';
// import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
// import * as ROLES from '../../constants/roles';
import Burger from '../../components/Burger';
import Menu from '../../components/BurgerMenu';
import { useOnClickOutside } from '../ClosingMenu';



const Nav = styled.nav`
  background: #C4C4C4;
  height: 50px;
  display: flex;
  margin: 0px;
  padding: 0px;
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
  padding: 0px;
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


const NavigationAuth = ({ authUser }) => {

    const [open, setOpen] = useState(false);
    const node = useRef(); 
    useOnClickOutside(node, () => setOpen(false));

    return (
    <div ref={node}>
        <Burger open={open} setOpen={setOpen}/>
        <Menu open={open} setOpen={setOpen} authUser={authUser} />
    </div>
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
}

const NavigationNonAuth = () => (
    <Nav>
        <NavItem>
            <NavLink to={ROUTES.LANDING}>Landing</NavLink>
        </NavItem>
    </Nav>
);

export default Navigation;
