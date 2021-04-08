import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthUserContext } from '../Session';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SettingsPage from '../Settings';

import { withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import styled, { ThemeProvider } from 'styled-components';
import { StyledButton } from '../SearchWordForm';


// Color themes for the website
// All themes need to have the same keys to change how the entire site looks
const Standard = {
    fg:"green",
    bg:"pink"
}
const Amazon = {
    fg: "palevioletred",
    bg: "purple",
    btnbg: "orange"
 };

const Tesla = {
    fg: "red",
    bg: "yellow"
}



const App = ({ firebase }) => {
    const [colorTheme, setColorTheme] = useState(Standard)

    let { uid } = useContext(AuthUserContext);

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('colorPreset')
            .on('value', snapshot => {
                if (snapshot) {
                    const colorObject = snapshot.val();
                    if (colorObject) {
                        let colorArray = Object.values(colorObject)
                        // This sets the firebase user values into object themename
                        if (colorArray == "Amazon") {
                            setColorTheme(Amazon)
                        } else if (colorArray == "Tesla") {
                            setColorTheme(Tesla)
                        } else if (colorArray == "Standard") {
                            setColorTheme(Standard)
                        }
                        // setColorTheme(colorArray)
                    } else {
                        setColorTheme(Standard);
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);

    return(
    <Router>
        <div>
            {/* The themeprovider links themes to all components inside of it */}
            <ThemeProvider theme={colorTheme}>
            <Navigation />
            <Route path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.SETTINGS} component={ SettingsPage } />
            </ThemeProvider>
        </div>
    </Router>
    );
}



export default withAuthentication(withFirebase(App));