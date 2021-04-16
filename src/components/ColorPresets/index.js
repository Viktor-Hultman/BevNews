import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import styled from 'styled-components';

import { StyledButton } from '../SearchWordForm'



const ColorContainer = styled.div`

`

const ColorSettingsCard = styled.div`
background-color: ${props => props.theme.card};
border-radius: 10px;
padding: 10px;
margin: 10px;
color: ${props => props.theme.txt};
`
const SelectedColorList = styled.div`
list-style:none;
`
const ColorDropDwn = styled.select`
padding: 5px 10px;
border: none;
margin: 5px;
border-radius: 4px;
background-color: #f1f1f1;
cursor: pointer;
`


const ColorPresets = ({ firebase }) => {

   // const [colorValue, setColorValue] = useState("")
   // const [colorName, setColorName] = useState("")
    const [selectedColor, setSelectedColor] = useState("Standard")

    let imgs = [
        "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/amazon-logo.png",
        "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
        "https://i.imgur.com/3orcm3Z.png"
    
      ];

    let { uid } = useContext(AuthUserContext);

    const setColor = (value, name) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('colorPreset')
            .set({ [value]: name })
    }


    const setLogo = (value, url) => {
        firebase.user(uid).child('settings').child('logoPreset')
            .set ({ [value]: url })
    }
    

    const ColorChange = (evt) => {
       // setColorValue(evt.target.value)
       // setColorName(evt.target.options[evt.target.selectedIndex].text)
       if (evt.target.value === "Standard") {
            setColor("Standard" , "Standard")
            setLogo("Standard", imgs[2])
       } else if (evt.target.value === "Amazon") {
            setColor("Amazon" , "Amazon")
            setLogo("AmazonLogo", imgs[0])
       } else if (evt.target.value === "Tesla") {
            setColor("Tesla" , "Tesla")
            setLogo("TeslaLogo", imgs[1])
       }
    }




    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('colorPreset')
            .on('value', snapshot => {
                if (snapshot) {
                    const colorObject = snapshot.val();
                    if (colorObject) {
                        let colorArray = Object.values(colorObject)
                        setSelectedColor(colorArray);
                    } else {
                        setSelectedColor("Standard");
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);


    return(
        <ColorContainer>
            <ColorSettingsCard>
                <h3> Here you can select prefered color preset</h3>
                <SelectedColorList>
                    <li>Your selected color preset: {selectedColor}</li>
                </SelectedColorList>
                <ColorDropdown ColorChange={ColorChange}/>
                <br/>
            </ColorSettingsCard>
        </ColorContainer>
    )
}

const ColorDropdown = ({ColorChange}) => (
    <form>  
        <label htmlFor="Color Presets">Select Color</label>
        <br/>
        <ColorDropDwn defaultValue={'DEFAULT'} name="Color Presets" onChange={ColorChange}>
            <option value="DEFAULT" disabled>Select a preset</option>
            <option value="Standard"> Standard </option> 
            <option value="Amazon"> Amazon </option>
            <option value="Tesla"> Tesla </option>
        </ColorDropDwn>
    </form>
)




export default (withFirebase(ColorPresets));