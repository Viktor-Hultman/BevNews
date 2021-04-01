import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

const Dashboard = ({ firebase }) => {
    //Several useStates for setting different states we will use later
    const [userWord1, setUserWord1] = useState("")
    const [userWord2, setUserWord2] = useState("")
    const [userWord3, setUserWord3] = useState("")
    const [userWordsArr, setUserWordsArr] = useState([])
    const [userCountry, setUserCountry] = useState("")

    const [userLanguage, setUserLanguage] = useState("")

    const [formattedTodayDate, setFormattedTodayDate] = useState("")
    const [formatted1WeekAgo, setFormatted1WeekAgo] = useState("")
    const [formatted2WeekAgo, setFormatted2WeekAgo] = useState("")
    const [formatted3WeekAgo, setFormatted3WeekAgo] = useState("")

    const [searchWord1DataCurrenWeek, setSearchWord1DataCurrentWeek] = useState("loading")




    //Setting some variables that we need for creating the full url we'll use in our api fetches
    const Url = "https://gnews.io/api/v4/search?q="
    const Key = "&token=8bd8954322ec49530ab22e22c8a3b84f"
    const Country = "&country"
    const Lang = "&lang"
    const From = "&from="
    const Time = "T00:00:01Z"
    const To = "&to="

    let fullUrlSearchWord1CurrentWeek = Url + userWord1 + From + formatted1WeekAgo + Time + To + formattedTodayDate + Time + Country + userCountry + Lang + userLanguage + Key
    let fullUrlSearchWord1OneWeekBack = Url + userWord1 + From + formatted2WeekAgo + Time + To + formatted1WeekAgo + Time + Country + userCountry + Lang + userLanguage + Key
    let fullUrlSearchWord1TwoWeeksBack = Url + userWord1 + From + formatted3WeekAgo + Time + To + formatted2WeekAgo + Time + Country + userCountry + Lang + userLanguage + Key

    let fullUrlSearchWord2CurrentWeek = Url + userWord2 + From + formatted1WeekAgo + Time + To + formattedTodayDate + Time + Country + userCountry + Lang + userLanguage + Key
    let fullUrlSearchWord2OneWeekBack = Url + userWord2 + From + formatted2WeekAgo + Time + To + formatted1WeekAgo + Time + Country + userCountry + Lang + userLanguage + Key
    let fullUrlSearchWord2TwoWeeksBack = Url + userWord2 + From + formatted3WeekAgo + Time + To + formatted2WeekAgo + Time + Country + userCountry + Lang + userLanguage + Key

    let fullUrlSearchWord3CurrentWeek = Url + userWord3 + From + formatted1WeekAgo + Time + To + formattedTodayDate + Time + Country + userCountry + Lang + userLanguage + Key
    let fullUrlSearchWord3OneWeekBack = Url + userWord3 + From + formatted2WeekAgo + Time + To + formatted1WeekAgo + Time + Country + userCountry + Lang + userLanguage + Key
    let fullUrlSearchWord3TwoWeeksBack = Url + userWord3 + From + formatted3WeekAgo + Time + To + formatted2WeekAgo + Time + Country + userCountry + Lang + userLanguage + Key
    //Here we get the full URL from the user, it contains one search word, a from date, a to date, the selected country and language
    // console.log(Url + userWord1 + From + formatted1WeekAgo + Time + To + formattedTodayDate + Time + Country + userCountry + Lang + userLanguage + Key)

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
                        setUserWordsArr(searchWordArray)

                    } else {
                        //Resets the useState variables if something happens to the users words
                        setUserWord1("");
                        setUserWord2("");
                        setUserWord3("");
                        setUserWordsArr([]);
                    }
                }
            });
        return () => {
            unsubscribe();
        }

    }, [formatted3WeekAgo]);

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

    }, [userWord3]);

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('language')
            .on('value', snapshot => {
                if (snapshot) {
                    const languageObject = snapshot.val();
                    if (languageObject) {
                        let userLanguageArr = Object.keys(languageObject)
                        setUserLanguage(userLanguageArr[0])
                        let trigger = 1

                    } else {
                        setUserLanguage("")
                    }
                }
            });
        return () => {
            unsubscribe();
        }

    }, [userWord3]);


    useEffect(() => {
        
      if (userWord3 === ""){
          console.log("userword is an empty string")
      } else {
        fetch(fullUrlSearchWord1CurrentWeek)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setSearchWord1DataCurrentWeek(data)
        }) 
        .catch((err)=>{
            console.log("oops..something went wrong", err)

        })
      }
        // console.log(searchWord1DataCurrenWeek.totalArticles) 
    }, [userWord3]);

    return (
        <>
            <h1>Dashboard</h1>
            <span>{userWord1}: {searchWord1DataCurrenWeek.totalArticles}</span>
        </>
    )

}



export default (withFirebase(Dashboard));