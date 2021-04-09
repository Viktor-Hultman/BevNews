import React, {useState, useEffect, useContext} from 'react';

import { withFirebase} from '../Firebase';
import { AuthUserContext } from '../Session';
import styled, { ThemeProvider } from 'styled-components';


// Color themes for the website
// All themes need to have the same keys to change how the entire site looks
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
export let OuterColorTheme = Standard

const ThemeProviderHook = ({firebase}) => {

    // const [colorTheme, setColorTheme] = useState(Standard)
    
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
                            OuterColorTheme = Amazon
                        } else if (colorArray == "Tesla") {
                            OuterColorTheme = Tesla
                        } else if (colorArray == "Standard") {
                            OuterColorTheme = Standard
                        }
                        // setColorTheme(colorArray)
                    } else {
                        OuterColorTheme = Standard;
                    }
                    return OuterColorTheme
                }
                console.log(OuterColorTheme)
            });
        return () => {
            unsubscribe();
        }
      
    }, []);

    return (
        <>
        </>
    )

}

export default withFirebase(ThemeProviderHook);