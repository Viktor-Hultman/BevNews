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
import Footer from '../Footer';
import SettingsPage from '../Settings';
import { NavigationAuth } from "../Navigation"

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
    bg:"#263238",
    btnbg:"#DCE7FA",
    btndis: "#656970",
    card: "#185C5E",
    websitebg: "#DCE7FA",
    txt: "#fff",
    txtInverted: "black"
}
export const Amazon = {
    fg: "palevioletred",
    bg: "#232f3e",
    btnbg: "#ff9900",
    btndis: "#ffc266",
    card: "#232f3e",
    websitebg: "#fff",
    txt: "#fff",
    txtInverted: "black"
 };

export const Tesla = {
    fg: "red",
    bg: "#cc0000",
    btnbg:"#cc0000",
    btndis: "#cf5955",
    card: "#818181",
    websitebg: "#fff",
    txt: "#000",
    txtInverted: "#000"
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
            <NavigationAuth authUser={authUser} />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.SETTINGS} component={SettingsPage} />
            <Footer/>
        </ThemeProvider>
    )

}

export default withAuthentication(withFirebase(ThemeProviderHook));