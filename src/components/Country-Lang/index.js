import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';


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
        <div>
            <h2>Here are your selected language and country preference on the shown data</h2>
            <ul>
                <li>Your selected country: {selectedCountry}</li>
                <li>Your selected language: {selectedLanguage}</li>
            </ul>
            <CountryDropdown isInvalidCountry={isInvalidCountry} CountryChange={CountryChange} CountrySaveButton={CountrySaveButton} />
            <br/>
            <LangDropdown isInvalidLanguage={isInvalidLanguage} LanguageChange={LanguageChange} LanguageSaveButton={LanguageSaveButton}/>
        </div>
    )
}

const CountryDropdown = ({ isInvalidCountry, CountryChange, CountrySaveButton}) => (
    <form onSubmit={CountrySaveButton} onChange={CountryChange}>  
        <label htmlFor="Countries">Select Country</label>
        <br/>
        <select defaultValue={'DEFAULT'} name="Countries">
            <option value="DEFAULT" disabled>Select an option</option> 
            <option value="=">All</option>   
            <option value="=au">Australia</option>
            <option value="=br">Brazil</option>
        </select>
        <input type="submit" value="Save" disabled={isInvalidCountry}/>
    </form>
)

const LangDropdown = ({ isInvalidLanguage, LanguageChange, LanguageSaveButton}) => (
    <form onSubmit={LanguageSaveButton} onChange={LanguageChange}> 
        <label htmlFor="Languages">Select Language</label>
        <br/>
        <select defaultValue={'DEFAULT'} name="Languages">
            <option value="DEFAULT" disabled>Select an option</option> 
            <option value="=">All</option>   
            <option value="=ar">Arabic</option>
            <option value="=en">English</option>
        </select>
        <input type="submit" value="Save" disabled={isInvalidLanguage}/>
    </form>
)






export default (withFirebase(CountryLangDropdowns));