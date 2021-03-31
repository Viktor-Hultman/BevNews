import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

const Dashboard = ({ firebase }) => {
    //Several useStates for setting different states we will use later
    const [userWord1, setUserWord1] = useState("")
    const [userWord2, setUserWord2] = useState("")
    const [userWord3, setUserWord3] = useState("")

    const [userCountry, setUserCountry] = useState("")

    const [userLanguage, setUserLanguage] = useState("")

    const [formattedTodayDate, setFormattedTodayDate] = useState("")
    const [formatted1WeekAgo, setFormatted1WeekAgo] = useState("")
    const [formatted2WeekAgo, setFormatted2WeekAgo] = useState("")
    const [formatted3WeekAgo, setFormatted3WeekAgo] = useState("")

    //Setting some variables that we need for creating the full url we'll use in our api fetches
    const Url = "https://gnews.io/api/v4/search?q="
    const Key = "&token=8bd8954322ec49530ab22e22c8a3b84f"
    const Country = "&country"
    const Lang = "&lang"
    const From = "&from="
    const Time = "T00:00:01Z"
    const To = "&to="

    //Here we get the full URL from the user, it contains one search word, a from date, a to date, the selected country and language
    console.log(Url + userWord1 + From + formatted1WeekAgo + Time + To + formattedTodayDate + Time + Country + userCountry + Lang + userLanguage + Key)

    //Getting the unique id of the signed in user from the context provider
    //so we can use it to link the user to their firebase data profile
    let { uid } = useContext(AuthUserContext);

    //Here we gather the timestap of when the page loads 
    const timestamp = Date.now()
    //The other timestamps get greated using 1 week as milliseconds
    let oneWeekAgoTimestamp = timestamp - 604800000
    let twoWeeksAgoTimestamp = timestamp - 1209600000
    let threeWeeksAgoTimestamp = timestamp - 1814400000

    //Creates variable to use later
    let todayDate
    let oneWeekAgoDate
    let twoWeeksAgoDate
    let threeWeeksAgoDate


    //A function that takes a string, the index of where to place the new string, and the new string to add
    function addStr(str, index, stringToAdd) {
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    }

    useEffect(() => {
        //Places the variable in corresponding order in arrays to cycle through in the for loop below
        let weekDatesArr = [todayDate, oneWeekAgoDate, twoWeeksAgoDate, threeWeeksAgoDate]
        let timestampArr = [timestamp, oneWeekAgoTimestamp, twoWeeksAgoTimestamp, threeWeeksAgoTimestamp]

        //For loop that takes the timestamps and recreates them as dates we can use in our fetch
        for (let i = 0; i < timestampArr.length; i++) {
            weekDatesArr[i] = new Date(timestampArr[i])
            weekDatesArr[i] = weekDatesArr[i].getFullYear() + '-' + (weekDatesArr[i].getMonth() + 1) + '-' + weekDatesArr[i].getDate();
            
            if (weekDatesArr[i].charAt(5) === 1) {
                console.log(weekDatesArr[i] + ": " + "this date is correct")
            } else {
                weekDatesArr[i] = (addStr(weekDatesArr[i], 5, 0))
            }
            console.log(weekDatesArr[i])
        }
        //Sets the useStates of the dates that we'll use for fetching 
        setFormattedTodayDate(weekDatesArr[0])
        setFormatted1WeekAgo(weekDatesArr[1])
        setFormatted2WeekAgo(weekDatesArr[2])
        setFormatted3WeekAgo(weekDatesArr[3])
    }, []);


   
    // //Big chunk of logging to the console for checking values
    // console.log(formatted3WeekAgo)
    // console.log(formatted2WeekAgo)
    // console.log(formatted1WeekAgo)
    // console.log(formattedTodayDate)
    // console.log(userLanguage)
    // console.log(userCountry)
    // console.log(userWord1, userWord2, userWord3)

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('searchWords')
            .on('value', snapshot => {
                if (snapshot) {
                    const searchWordsObject = snapshot.val();
                    if (searchWordsObject) {
                        let searchWordArray = Object.keys(searchWordsObject)
                        //Here we take our array of the users searchwords from firebase and
                        //"set" in their own useState variable
                        setUserWord1(searchWordArray[0])
                        setUserWord2(searchWordArray[1])
                        setUserWord3(searchWordArray[2])

                    } else {
                        //Resets the useState variables if something happens to the users words
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

    //In the two useEffects below we do the same with the users selected country and language
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
        </>
    )

}




export default (withFirebase(Dashboard));