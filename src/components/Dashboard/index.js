import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

const Dashboard = ({ firebase }) => {
 
    const [userWord1, setUserWord1] = useState("")   
    const [userWord2, setUserWord2] = useState("")    
    const [userWord3, setUserWord3] = useState("")   

    const [userCountry, setUserCountry] = useState("")

    const [userLanguage, setUserLanguage] = useState("")
    
    const Url = "https://gnews.io/api/v4/search?q="
    const Key = "&token=8bd8954322ec49530ab22e22c8a3b84f"
    const Country = "&country"
    const Lang = "&lang"

    //Here we get the full URL from the user, it contains one search word, the selected country and language
    console.log(Url + userWord1 + Country + userCountry + Lang + userLanguage + Key)

    let { uid } = useContext(AuthUserContext);


    const getWords = () => {
        console.log(userWord1);
    }
    console.log(userLanguage)
    console.log(userCountry)
    console.log(userWord1, userWord2, userWord3)
    useEffect(() => { 
        const unsubscribe = firebase.user(uid).child('settings').child('searchWords')
        .on('value', snapshot => { 
            if (snapshot) {
                const searchWordsObject = snapshot.val();
                if (searchWordsObject) {
                    let searchWordArray = Object.keys(searchWordsObject)
                    setUserWord1(searchWordArray[0])
                    setUserWord2(searchWordArray[1])
                    setUserWord3(searchWordArray[2])

                } else {
                    setUserWord1("");
                    setUserWord2("");
                    setUserWord3("");
                }
            }
        });
    return () => {
        unsubscribe();
    }

}, []);

useEffect(() => { 
    const unsubscribe = firebase.user(uid).child('settings').child('country')
    .on('value', snapshot => {
        if (snapshot) {
            const countryObj = snapshot.val();
            if (countryObj) {
                let userCountry = Object.keys(countryObj)
                setUserCountry(userCountry[0])

            } else {
               setUserCountry("")
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
                let userLanguageArr = Object.keys(languageObject)
                setUserLanguage(userLanguageArr[0])

            } else {
               setUserLanguage("")
            }
        }
    });
return () => {
    unsubscribe();
}

}, []);


    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={getWords}>Get words</button>
        </>
    )

}




export default (withFirebase(Dashboard));