import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

const Dashboard = ({ firebase }) => {
 
    const [userWord1, setUserWord1] = useState("")   
    const [userWord2, setUserWord2] = useState("")    
    const [userWord3, setUserWord3] = useState("")   

    const [userCountry, setUserCountry] = useState("")

    const [userLanguage, setUserLanguage] = useState("")

    const [formattedTodayDate, setFormattedTodayDate] = useState("")
    const [formatted1WeekAgo, setFormatted1WeekAgo] = useState("")
    const [formatted2WeekAgo, setFormatted2WeekAgo] = useState ("")
    const [formatted3WeekAgo, setFormatted3WeekAgo] = useState ("")

    const Url = "https://gnews.io/api/v4/search?q="
    const Key = "&token=8bd8954322ec49530ab22e22c8a3b84f"
    const Country = "&country"
    const Lang = "&lang"
    const From = "&from="
    const Time = "T00:00:01Z"
    const To = "&to="

    //Here we get the full URL from the user, it contains one search word, the selected country and language
    console.log(Url + userWord1 + From + formatted1WeekAgo + Time + To + formattedTodayDate + Time + Country + userCountry + Lang + userLanguage + Key)

    let { uid } = useContext(AuthUserContext);

    const timestamp = Date.now() 
    const timeDate = new Date(timestamp)
    console.log(timeDate)
    console.log(timestamp)
    const getWords = () => {
        console.log(userWord1);
    }

    let today = new Date(timestamp),
    todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(todayDate)

    let oneWeekAgoTimestamp = timestamp-604800000
    let oneWeekAgo = new Date(oneWeekAgoTimestamp),
    oneWeekAgoDate = oneWeekAgo.getFullYear() + '-' + (oneWeekAgo.getMonth() + 1) + '-' + oneWeekAgo.getDate();
    console.log(oneWeekAgoDate)

    let twoWeeksAgoTimestamp = timestamp-1209600000
    let twoWeeksAgo = new Date(twoWeeksAgoTimestamp),
    twoWeeksAgoDate = twoWeeksAgo.getFullYear() + '-' + (twoWeeksAgo.getMonth() + 1) + '-' + twoWeeksAgo.getDate();

    let threeWeeksAgoTimestamp = timestamp-1814400000
    let threeWeeksAgo = new Date(threeWeeksAgoTimestamp),
    threeWeeksAgoDate = threeWeeksAgo.getFullYear() + '-' + (threeWeeksAgo.getMonth() + 1) + '-' + threeWeeksAgo.getDate();
    

    let zero = 0

    function addStr(str, index, stringToAdd){
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
      }

    useEffect(() => {
        if (todayDate.charAt(5) === 1){
            console.log("this date is correct")
        } else { 
            setFormattedTodayDate(addStr(todayDate, 5, zero))
        }

        if (oneWeekAgoDate.charAt(5) === 1){
            console.log("this date is correct")
        } else { 
            setFormatted1WeekAgo(addStr(oneWeekAgoDate, 5, zero))
        }

        if (twoWeeksAgoDate.charAt(5) === 1){
            console.log("this date is correct")
        } else { 
            setFormatted2WeekAgo(addStr(twoWeeksAgoDate, 5, zero))
        }
        if (threeWeeksAgoDate.charAt(5) === 1){
            console.log("this date is correct")
        } else { 
            setFormatted3WeekAgo(addStr(threeWeeksAgoDate, 5, zero))
        }
       
    },[]);
    console.log(formatted3WeekAgo)
    console.log(formatted2WeekAgo)
    console.log(formattedTodayDate)
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