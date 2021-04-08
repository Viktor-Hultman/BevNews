import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import styled from 'styled-components';

import { StyledButton } from '../SearchWordForm'



const ColorLangContainer = styled.div`

`

const ColorSettingsCard = styled.div`
background-color: #C4C4C4;
border-radius: 10px;
padding: 10px;
margin: 10px;
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
const LangDropDwn = styled(ColorDropDwn)``


const ColorPresets = ({ firebase }) => {

    const [colorValue, setColorValue] = useState("")
    const [colorName, setColorName] = useState("")
    const [selectedColor, setSelectedColor] = useState("Standard")
    

    let { uid } = useContext(AuthUserContext);

    const setColor = (value, name) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('colorPreset')
            .set({ [value]: name })
    }

    const ColorChange = (evt) => {
        setColorValue(evt.target.value)
        setColorName(evt.target.options[evt.target.selectedIndex].text)
    }

    const ColorSaveButton = (evt) => {
        setColor(colorValue, colorName)
        evt.preventDefault();
    }


    const isInvalidColor =
    colorValue === "";
    

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
        <ColorLangContainer>
            <ColorSettingsCard>
                <h3> Here you can select prefered color preset</h3>
                <SelectedColorList>
                    <li>Your selected color preset: {selectedColor}</li>
                </SelectedColorList>
                <ColorDropdown isInvalidColor={isInvalidColor} ColorChange={ColorChange} ColorSaveButton={ColorSaveButton} />
                <br/>
            </ColorSettingsCard>
        </ColorLangContainer>
    )
}

const ColorDropdown = ({ isInvalidColor, ColorChange, ColorSaveButton}) => (
    <form onSubmit={ColorSaveButton} onChange={ColorChange}>  
        <label htmlFor="Color Presets">Select Color</label>
        <br/>
        <ColorDropDwn defaultValue={'DEFAULT'} name="Color Presets">
            <option value="DEFAULT" disabled>Select a preset</option>
            <option value="Standard"> Standard </option> 
            <option value="Amazon"> Amazon </option>
            <option value="Tesla"> Tesla </option>
        </ColorDropDwn>
        <StyledButton type="submit" value="Save" disabled={isInvalidColor}>Save</StyledButton>
    </form>
)




export default (withFirebase(ColorPresets));