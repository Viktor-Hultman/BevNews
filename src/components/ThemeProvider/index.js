import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { withAuthentication } from '../Session';
import { withFirebase} from '../Firebase';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';

import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SettingsPage from '../Settings';


// Color themes for the website
// All themes need to have the same keys to change how the entire site looks
/*const colorsObj = {
    Standard: {
        fg:"green",
        bg:"pink",
        btnbg:"gray",
        btndis: "red"
    },
    Amazon: {
        fg: "palevioletred",
        bg: "purple",
        btnbg: "orange",
        btndis: "yellow"
     }
};*/
// Object.keys(colorsObj) -> ['Standard', 'Amazon']
// let selected = 'Amazon'
// console.log(colorsObj[selected]) -> {fg: ..., bg: ...}

export const Standard = {
    fg:"green",
    bg:"pink",
    btnbg:"gray",
    btndis: "red"
}
export const Amazon = {
    fg: "palevioletred",
    bg: "purple",
    btnbg: "orange",
    btndis: "yellow"
 };

export const Tesla = {
    fg: "red",
    bg: "yellow",
    btnbg:"blue",
    btndis: "red"
}


const ThemeProviderHook = ({firebase, authUser }) => {

    const [colorTheme, setColorTheme] = useState(Standard)
    let uid = authUser.uid;
    
    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('colorPreset')
            .on('value', snapshot => {
                if (snapshot) {
                    const colorObject = snapshot.val();
                    if (colorObject) {
                        let colorArray = Object.values(colorObject)
                        // This sets the firebase user values into object themename
                        if (colorArray == "Amazon") {
                            setColorTheme(Amazon);
                        } else if (colorArray == "Tesla") {
                            setColorTheme(Tesla);
                        } else if (colorArray == "Standard") {
                            setColorTheme(Standard);
                        }
                        
                    } else {
                        setColorTheme(Standard);
                    }
                    
                }
                console.log(colorTheme)
            });
        return () => {
            unsubscribe();
        }
      
    }, []);

    return (
        //The theme provider is surounding the route pages it shhould affect
        <ThemeProvider theme={colorTheme}>
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.SETTINGS} component={SettingsPage} />
        </ThemeProvider>
    )

}

export default withAuthentication(withFirebase(ThemeProviderHook));