import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { withAuthentication } from '../Session';
import { withFirebase} from '../Firebase';

import * as ROUTES from '../../constants/routes';

import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Footer from '../Footer';
import SettingsPage from '../Settings';
import { NavigationAuth } from "../Navigation"


export const Standard = {
    bg:"#263238",
    btnbg:"#185C5E",
    btndis: "#656970",
    card: "#263238",
    websitebg: "#DCE7FA",
    txt: "#fff",
    txtInverted: "#000"
}
export const Amazon = {
    bg: "#232f3e",
    btnbg: "#ff9900",
    btndis: "#ffc266",
    card: "#232f3e",
    websitebg: "#fff",
    txt: "#fff",
    txtInverted: "#000"
 };

export const Tesla = {
    bg: "#212121",
    btnbg:"#cc0000",
    btndis: "#cf5955",
    card: "#212121",
    websitebg: "#f2f2f2",
    txt: "#fff",
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
            });
        return () => {
            unsubscribe();
        }
      
    }, []);

    return (
        //The theme provider is surounding the route pages it shhould affect
        <ThemeProvider theme={colorTheme}>
            <NavigationAuth firebase={firebase} authUser={authUser} />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.SETTINGS} component={SettingsPage} />
            <Footer/>
        </ThemeProvider>
    )

}

export default withAuthentication(withFirebase(ThemeProviderHook));