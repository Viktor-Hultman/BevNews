import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import styled from 'styled-components';

const CountryLangContainer = styled.div`

`
const CountrySettingsCard = styled.div`
background-color: #C4C4C4;
border-radius: 10px;
padding: 10px;
margin: 10px;
`
const SelectedCountryList = styled.div`
list-style:none;
`
const CountryDropDwn = styled.select`
padding: 5px 10px;
border: none;
border-radius: 4px;
background-color: #f1f1f1;
`
const LangDropDwn = styled.select`
padding: 5px 10px;
border: none;
border-radius: 4px;
background-color: #f1f1f1;
`


const CountryLangDropdowns = ({ firebase }) => {

    const [countryValue, setCountryValue] = useState("")
    const [languageValue, setLanguageValue] = useState("")

    const [countryName, setCountryName] = useState("")
    const [languageName, setLanguageName] = useState("")

    const [selectedCountry, setSelectedCountry] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState([])

    let { uid } = useContext(AuthUserContext);

    const setCountry = (value, name) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('country')
            .set({ [value]: name })
    }

    const setLanguage = (value, name) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('language')
            .set({ [value]: name})
    }

    const CountryChange = (evt) => {
        setCountryValue(evt.target.value)
        setCountryName(evt.target.options[evt.target.selectedIndex].text)
    }

    const CountrySaveButton = (evt) => {
        setCountry(countryValue, countryName)
        evt.preventDefault();
    }

    const LanguageChange = (evt) => {
        setLanguageValue(evt.target.value)
        setLanguageName(evt.target.options[evt.target.selectedIndex].text)
    }

    const LanguageSaveButton = (evt) => {
        setLanguage(languageValue, languageName)
        evt.preventDefault();
    }

    const isInvalidCountry =
    countryValue === "";
    
    const isInvalidLanguage =
    languageValue === "";

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('country')
            .on('value', snapshot => {
                if (snapshot) {
                    const countryObject = snapshot.val();
                    if (countryObject) {
                        let countryArray = Object.values(countryObject)
                        setSelectedCountry(countryArray);
                    } else {
                        setSelectedCountry([]);
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('language')
            .on('value', snapshot => {
                if (snapshot) {
                    const languageObject = snapshot.val();
                    if (languageObject) {
                        let languageArray = Object.values(languageObject)
                        setSelectedLanguage(languageArray);
                    } else {
                        setSelectedLanguage([]);
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);

    return(
        <CountryLangContainer>
            <CountrySettingsCard>
                <h3>Here are your selected language and country preference on the shown data</h3>
                <SelectedCountryList>
                    <li>Your selected country: {selectedCountry}</li>
                    <li>Your selected language: {selectedLanguage}</li>
                </SelectedCountryList>
                <CountryDropdown isInvalidCountry={isInvalidCountry} CountryChange={CountryChange} CountrySaveButton={CountrySaveButton} />
                <br/>
                <LangDropdown isInvalidLanguage={isInvalidLanguage} LanguageChange={LanguageChange} LanguageSaveButton={LanguageSaveButton}/>
            </CountrySettingsCard>
        </CountryLangContainer>
    )
}

const CountryDropdown = ({ isInvalidCountry, CountryChange, CountrySaveButton}) => (
    <form onSubmit={CountrySaveButton} onChange={CountryChange}>  
        <label htmlFor="Countries">Select Country</label>
        <br/>
        <CountryDropDwn defaultValue={'DEFAULT'} name="Countries">
            <option value="DEFAULT" disabled>Select an option</option> 
            <option value="=">All</option>   
            <option value="=au">Australia</option>
            <option value="=br">Brazil</option>
            <option value="=ca">Canada</option>   
            <option value="=cn">China</option>
            <option value="=eg">Egypt</option>
            <option value="=fr">France</option>  
            <option value="=gr">Greece</option> 
            <option value="=de">Germany</option>  
            <option value="=hk">Hong Kong</option>   
            <option value="=ie">Ireland</option>
            <option value="=il">Israel</option>
            <option value="=in">India</option>   
            <option value="=it">Italy</option>
            <option value="=jp">Japan</option> 
            <option value="=nl">Netherlands</option>  
            <option value="=no">Norway</option>
            <option value="=pk">Pakistan</option>
            <option value="=pr">Peru</option>
            <option value="=ph">Philippines</option>   
            <option value="=pt">Portugal</option>
            <option value="=ro">Romania</option>   
            <option value="=ru">Russia</option>
            <option value="=es">Spain</option>
            <option value="=se">Sweden</option>
            <option value="=ch">Switzerland</option>
            <option value="=tw">Taiwan</option>   
            <option value="=ua">Ukraine</option>
            <option value="=gb">United Kingdom</option>
            <option value="=us">United States</option>
        </CountryDropDwn>
        <input type="submit" value="Save" disabled={isInvalidCountry}/>
    </form>
)

const LangDropdown = ({ isInvalidLanguage, LanguageChange, LanguageSaveButton}) => (
    <form onSubmit={LanguageSaveButton} onChange={LanguageChange}> 
        <label htmlFor="Languages">Select Language</label>
        <br/>
        <LangDropDwn defaultValue={'DEFAULT'} name="Languages">
            <option value="DEFAULT" disabled>Select an option</option> 
            <option value="=">All</option>   
            <option value="=ar">Arabic</option>
            <option value="=zh">Chinese</option>
            <option value="=nl">Dutch</option>
            <option value="=en">English</option>
            <option value="=fr">French</option>
            <option value="=de">German</option>   
            <option value="=el">Greek</option>
            <option value="=he">Hebrew</option>
            <option value="=hi">Hindi</option>   
            <option value="=it">Italian</option>
            <option value="=jp">Japanese</option>
            <option value="=ml">Malayalam</option>   
            <option value="=mr">Marathi</option>
            <option value="=no">Norwegian</option>   
            <option value="=pt">Portuguese</option>
            <option value="=ro">Romanian</option>
            <option value="=ru">Russian</option>   
            <option value="=es">Spanish</option>   
            <option value="=sv">Swedish</option>
            <option value="=ta">Tamil</option>
            <option value="=te">Telugu</option>
            <option value="=uk">Ukrainian</option>   
        </LangDropDwn>
        <input type="submit" value="Save" disabled={isInvalidLanguage}/>
    </form>
)






export default (withFirebase(CountryLangDropdowns));