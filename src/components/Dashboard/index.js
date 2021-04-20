import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import { Doughnut, Line, Bar } from 'react-chartjs-2';

import styled from 'styled-components';

import { ChoosenWordsCard } from '../SearchWordForm'

import { PageTitle } from '../Account'

import { StyledButton } from '../SearchWordForm'

import DashboardGraphs from '../Graphs'



const Dashboard = ({ firebase }) => {
    //Several useStates for setting different states we will use later
    const [userWord1, setUserWord1] = useState("")
    const [userWord2, setUserWord2] = useState("")
    const [userWord3, setUserWord3] = useState("")
    const [userWordsArr, setUserWordsArr] = useState([])
    // const [userCountry, setUserCountry] = useState("")

    // const [userLanguage, setUserLanguage] = useState("")

    const [formattedTodayDate, setFormattedTodayDate] = useState("")
    const [formatted1WeekAgo, setFormatted1WeekAgo] = useState("")
    const [formatted2WeekAgo, setFormatted2WeekAgo] = useState("")
    const [formatted3WeekAgo, setFormatted3WeekAgo] = useState("")


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

            } else {
                weekDatesArr[i] = (addStr(weekDatesArr[i], 5, 0))
            }

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
    // console.log(formatted1WeeayDate)
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

    }, []); // här stod tidigare nånting weeks


    return (
        <>
            <PageTitle>Dashboard</PageTitle>
            {/* syntax for conditional rendering: state1 && state2 && state3 && <FetchComp states={[state1,state2,state3]} />*/}

            {userWordsArr[0] &&
                !userWordsArr[1] &&
                formatted1WeekAgo &&
                formatted2WeekAgo &&
                formatted3WeekAgo &&
                formattedTodayDate &&
                <FetchComp1Words
                    firebase={firebase}
                    uid={uid}
                    userWordsArr={userWordsArr}
                    formatted1WeekAgo={formatted1WeekAgo}
                    formatted2WeekAgo={formatted2WeekAgo}
                    formatted3WeekAgo={formatted3WeekAgo}
                    formattedTodayDate={formattedTodayDate}
                />
            }

            {userWordsArr[1] &&
                !userWordsArr[2] &&
                formatted1WeekAgo &&
                formatted2WeekAgo &&
                formatted3WeekAgo &&
                formattedTodayDate &&
                <FetchComp2Words
                    firebase={firebase}
                    uid={uid}
                    userWordsArr={userWordsArr}
                    formatted1WeekAgo={formatted1WeekAgo}
                    formatted2WeekAgo={formatted2WeekAgo}
                    formatted3WeekAgo={formatted3WeekAgo}
                    formattedTodayDate={formattedTodayDate}
                />
            }

            {userWordsArr[2] &&
                formatted1WeekAgo &&
                formatted2WeekAgo &&
                formatted3WeekAgo &&
                formattedTodayDate &&
                <FetchComp3Words
                    firebase={firebase}
                    uid={uid}
                    userWordsArr={userWordsArr}
                    formatted1WeekAgo={formatted1WeekAgo}
                    formatted2WeekAgo={formatted2WeekAgo}
                    formatted3WeekAgo={formatted3WeekAgo}
                    formattedTodayDate={formattedTodayDate}
                />
            }

        </>
    )

}

const FetchComp1Words = ({ firebase,
    uid,
    userWordsArr,
    formatted1WeekAgo,
    formatted2WeekAgo,
    formatted3WeekAgo,
    formattedTodayDate,
}) => {

    const [searchWord1DataCurrenWeek, setSearchWord1DataCurrentWeek] = useState("")
    const [searchWord1DataOneWeekBack, setSearchWord1DataOneWeekBack] = useState("")
    const [searchWord1DataTwoWeeksBack, setSearchWord1DataTwoWeeksBack] = useState("")


    //Setting some variables that we need for creating the full url we'll use in our api fetches
    const Url = "https://content.guardianapis.com/search?q="
    const Key = "&api-key=5302bcc3-f459-4d4e-93e3-8f8ef66ae980"
    const From = "&from-date="
    const To = "&to-date="



    let fullUrlSearchWord1CurrentWeek = Url + userWordsArr[0] + From + formatted1WeekAgo + To + formattedTodayDate + Key
    let fullUrlSearchWord1OneWeekBack = Url + userWordsArr[0] + From + formatted2WeekAgo + To + formatted1WeekAgo + Key
    let fullUrlSearchWord1TwoWeeksBack = Url + userWordsArr[0] + From + formatted3WeekAgo + To + formatted2WeekAgo + Key


    useEffect(() => {
        // förslag todo: bryt ut i separat komponent
        function bigFetch() {

            setTimeout(function () {
                fetch(fullUrlSearchWord1CurrentWeek)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataCurrentWeek(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 100)

            setTimeout(function () {
                fetch(fullUrlSearchWord1OneWeekBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataOneWeekBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 110)

            setTimeout(function () {
                fetch(fullUrlSearchWord1TwoWeeksBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataTwoWeeksBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 120)
        }

        bigFetch()

    }, []);


    return (
        <>
            {
                searchWord1DataCurrenWeek &&
                searchWord1DataOneWeekBack &&
                searchWord1DataTwoWeeksBack &&
                <GraphData1Words
                    firebase={firebase}
                    uid={uid}
                    userWordsArr={userWordsArr}
                    searchWord1DataCurrenWeek={searchWord1DataCurrenWeek}
                    searchWord1DataOneWeekBack={searchWord1DataOneWeekBack}
                    searchWord1DataTwoWeeksBack={searchWord1DataTwoWeeksBack}

                />
            }
        </>
    )
}

const FetchComp2Words = ({ firebase,
    uid,
    userWordsArr,
    formatted1WeekAgo,
    formatted2WeekAgo,
    formatted3WeekAgo,
    formattedTodayDate,
}) => {

    const [searchWord1DataCurrenWeek, setSearchWord1DataCurrentWeek] = useState("")
    const [searchWord1DataOneWeekBack, setSearchWord1DataOneWeekBack] = useState("")
    const [searchWord1DataTwoWeeksBack, setSearchWord1DataTwoWeeksBack] = useState("")

    const [searchWord2DataCurrenWeek, setSearchWord2DataCurrentWeek] = useState("")
    const [searchWord2DataOneWeekBack, setSearchWord2DataOneWeekBack] = useState("")
    const [searchWord2DataTwoWeeksBack, setSearchWord2DataTwoWeeksBack] = useState("")


    //Setting some variables that we need for creating the full url we'll use in our api fetches
    const Url = "https://content.guardianapis.com/search?q="
    const Key = "&api-key=5302bcc3-f459-4d4e-93e3-8f8ef66ae980"
    const From = "&from-date="
    const To = "&to-date="



    let fullUrlSearchWord1CurrentWeek = Url + userWordsArr[0] + From + formatted1WeekAgo + To + formattedTodayDate + Key
    let fullUrlSearchWord1OneWeekBack = Url + userWordsArr[0] + From + formatted2WeekAgo + To + formatted1WeekAgo + Key
    let fullUrlSearchWord1TwoWeeksBack = Url + userWordsArr[0] + From + formatted3WeekAgo + To + formatted2WeekAgo + Key

    let fullUrlSearchWord2CurrentWeek = Url + userWordsArr[1] + From + formatted1WeekAgo + To + formattedTodayDate + Key
    let fullUrlSearchWord2OneWeekBack = Url + userWordsArr[1] + From + formatted2WeekAgo + To + formatted1WeekAgo + Key
    let fullUrlSearchWord2TwoWeeksBack = Url + userWordsArr[1] + From + formatted3WeekAgo + To + formatted2WeekAgo + Key



    useEffect(() => {
        // förslag todo: bryt ut i separat komponent
        function bigFetch() {

            setTimeout(function () {
                fetch(fullUrlSearchWord1CurrentWeek)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataCurrentWeek(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 100)

            setTimeout(function () {
                fetch(fullUrlSearchWord1OneWeekBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataOneWeekBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 110)

            setTimeout(function () {
                fetch(fullUrlSearchWord1TwoWeeksBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataTwoWeeksBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 120)

            setTimeout(function () {
                fetch(fullUrlSearchWord2CurrentWeek)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord2DataCurrentWeek(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 130)

            setTimeout(function () {
                fetch(fullUrlSearchWord2OneWeekBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord2DataOneWeekBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 140)

            setTimeout(function () {
                fetch(fullUrlSearchWord2TwoWeeksBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord2DataTwoWeeksBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 150)

        }

        bigFetch()


    }, []);


    return (
        <>
            {
                searchWord1DataCurrenWeek &&
                searchWord1DataOneWeekBack &&
                searchWord1DataTwoWeeksBack &&
                searchWord2DataCurrenWeek &&
                searchWord2DataOneWeekBack &&
                searchWord2DataTwoWeeksBack &&
                <GraphData2Words
                    firebase={firebase}
                    uid={uid}
                    userWordsArr={userWordsArr}
                    searchWord1DataCurrenWeek={searchWord1DataCurrenWeek}
                    searchWord1DataOneWeekBack={searchWord1DataOneWeekBack}
                    searchWord1DataTwoWeeksBack={searchWord1DataTwoWeeksBack}
                    searchWord2DataCurrenWeek={searchWord2DataCurrenWeek}
                    searchWord2DataOneWeekBack={searchWord2DataOneWeekBack}
                    searchWord2DataTwoWeeksBack={searchWord2DataTwoWeeksBack}

                />
            }
        </>
    )
}


const FetchComp3Words = ({ firebase,
    uid,
    userWordsArr,
    formatted1WeekAgo,
    formatted2WeekAgo,
    formatted3WeekAgo,
    formattedTodayDate,
}) => {

    const [searchWord1DataCurrenWeek, setSearchWord1DataCurrentWeek] = useState("")
    const [searchWord1DataOneWeekBack, setSearchWord1DataOneWeekBack] = useState("")
    const [searchWord1DataTwoWeeksBack, setSearchWord1DataTwoWeeksBack] = useState("")

    const [searchWord2DataCurrenWeek, setSearchWord2DataCurrentWeek] = useState("")
    const [searchWord2DataOneWeekBack, setSearchWord2DataOneWeekBack] = useState("")
    const [searchWord2DataTwoWeeksBack, setSearchWord2DataTwoWeeksBack] = useState("")

    const [searchWord3DataCurrenWeek, setSearchWord3DataCurrentWeek] = useState("")
    const [searchWord3DataOneWeekBack, setSearchWord3DataOneWeekBack] = useState("")
    const [searchWord3DataTwoWeeksBack, setSearchWord3DataTwoWeeksBack] = useState("")
    //Setting some variables that we need for creating the full url we'll use in our api fetches
    const Url = "https://content.guardianapis.com/search?q="
    const Key = "&api-key=5302bcc3-f459-4d4e-93e3-8f8ef66ae980"

    const From = "&from-date="
    const To = "&to-date="



    let fullUrlSearchWord1CurrentWeek = Url + userWordsArr[0] + From + formatted1WeekAgo + To + formattedTodayDate + Key
    let fullUrlSearchWord1OneWeekBack = Url + userWordsArr[0] + From + formatted2WeekAgo + To + formatted1WeekAgo + Key
    let fullUrlSearchWord1TwoWeeksBack = Url + userWordsArr[0] + From + formatted3WeekAgo + To + formatted2WeekAgo + Key

    let fullUrlSearchWord2CurrentWeek = Url + userWordsArr[1] + From + formatted1WeekAgo + To + formattedTodayDate + Key
    let fullUrlSearchWord2OneWeekBack = Url + userWordsArr[1] + From + formatted2WeekAgo + To + formatted1WeekAgo + Key
    let fullUrlSearchWord2TwoWeeksBack = Url + userWordsArr[1] + From + formatted3WeekAgo + To + formatted2WeekAgo + Key

    let fullUrlSearchWord3CurrentWeek = Url + userWordsArr[2] + From + formatted1WeekAgo + To + formattedTodayDate + Key
    let fullUrlSearchWord3OneWeekBack = Url + userWordsArr[2] + From + formatted2WeekAgo + To + formatted1WeekAgo + Key
    let fullUrlSearchWord3TwoWeeksBack = Url + userWordsArr[2] + From + formatted3WeekAgo + To + formatted2WeekAgo + Key


    useEffect(() => {
        // förslag todo: bryt ut i separat komponent
        function bigFetch() {

            setTimeout(function () {
                fetch(fullUrlSearchWord1CurrentWeek)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataCurrentWeek(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 100)

            setTimeout(function () {
                fetch(fullUrlSearchWord1OneWeekBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataOneWeekBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 110)

            setTimeout(function () {
                fetch(fullUrlSearchWord1TwoWeeksBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord1DataTwoWeeksBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 120)

            setTimeout(function () {
                fetch(fullUrlSearchWord2CurrentWeek)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord2DataCurrentWeek(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 130)

            setTimeout(function () {
                fetch(fullUrlSearchWord2OneWeekBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord2DataOneWeekBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 140)

            setTimeout(function () {
                fetch(fullUrlSearchWord2TwoWeeksBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord2DataTwoWeeksBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 150)

            setTimeout(function () {
                fetch(fullUrlSearchWord3CurrentWeek)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord3DataCurrentWeek(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 160)

            setTimeout(function () {
                fetch(fullUrlSearchWord3OneWeekBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord3DataOneWeekBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 170)

            setTimeout(function () {
                fetch(fullUrlSearchWord3TwoWeeksBack)
                    .then(response => { return response.json(); })
                    .then(data => { setSearchWord3DataTwoWeeksBack(data) })
                    .catch((err) => { console.log("oops..something went wrong", err) })
            }, 180)
        }

        bigFetch()


    }, []);


    return (
        <>
            {
                searchWord1DataCurrenWeek &&
                searchWord1DataOneWeekBack &&
                searchWord1DataTwoWeeksBack &&
                searchWord2DataCurrenWeek &&
                searchWord2DataOneWeekBack &&
                searchWord2DataTwoWeeksBack &&
                searchWord3DataCurrenWeek &&
                searchWord3DataOneWeekBack &&
                searchWord3DataTwoWeeksBack &&
                <GraphData3Words
                    firebase={firebase}
                    uid={uid}
                    userWordsArr={userWordsArr}
                    searchWord1DataCurrenWeek={searchWord1DataCurrenWeek}
                    searchWord1DataOneWeekBack={searchWord1DataOneWeekBack}
                    searchWord1DataTwoWeeksBack={searchWord1DataTwoWeeksBack}
                    searchWord2DataCurrenWeek={searchWord2DataCurrenWeek}
                    searchWord2DataOneWeekBack={searchWord2DataOneWeekBack}
                    searchWord2DataTwoWeeksBack={searchWord2DataTwoWeeksBack}
                    searchWord3DataCurrenWeek={searchWord3DataCurrenWeek}
                    searchWord3DataOneWeekBack={searchWord3DataOneWeekBack}
                    searchWord3DataTwoWeeksBack={searchWord3DataTwoWeeksBack}
                />
            }
        </>
    )
}


const GraphData1Words = ({ firebase,
    uid,
    userWordsArr,
    searchWord1DataCurrenWeek,
    searchWord1DataOneWeekBack,
    searchWord1DataTwoWeeksBack
    }) => {

    let currentWeekData1 = searchWord1DataCurrenWeek ? searchWord1DataCurrenWeek.response.total : null
    let oneWeekAgoData1 = searchWord1DataOneWeekBack ? searchWord1DataOneWeekBack.response.total : null
    let twoWeeksAgoData1 = searchWord1DataTwoWeeksBack ? searchWord1DataTwoWeeksBack.response.total : null


    let dataObjsArr = [
        searchWord1DataCurrenWeek,
        searchWord1DataOneWeekBack,
        searchWord1DataTwoWeeksBack,
    ]

    let dataResultsArr =
        [currentWeekData1,
            oneWeekAgoData1,
            twoWeeksAgoData1
        ]


    for (let i = 0; i < dataResultsArr.length; i++) {
        if (dataResultsArr[i] == 0) {
            dataResultsArr[i] = dataResultsArr[i] + 1
        }

    }


    let titles = {
        searchWord1: userWordsArr[0]

    }

    let searchWord1Data = {
        currentWeekData1,
        oneWeekAgoData1,
        twoWeeksAgoData1
    }



    let dataObjTotalResults = {
        titles,
        searchWord1Data
    }

    return (
        <div>
            {dataResultsArr &&
                <DashboardGraphs firebase={firebase} uid={uid} userWordsArr={userWordsArr} data={dataObjTotalResults} dataObjsArr={dataObjsArr} />
            }
        </div>
    )
}


const GraphData2Words = ({ firebase,
    uid,
    userWordsArr,
    searchWord1DataCurrenWeek,
    searchWord1DataOneWeekBack,
    searchWord1DataTwoWeeksBack,
    searchWord2DataCurrenWeek,
    searchWord2DataOneWeekBack,
    searchWord2DataTwoWeeksBack }) => {



    let currentWeekData1 = searchWord1DataCurrenWeek ? searchWord1DataCurrenWeek.response.total : null
    let oneWeekAgoData1 = searchWord1DataOneWeekBack ? searchWord1DataOneWeekBack.response.total : null
    let twoWeeksAgoData1 = searchWord1DataTwoWeeksBack ? searchWord1DataTwoWeeksBack.response.total : null

    let currentWeekData2 = searchWord2DataCurrenWeek ? searchWord2DataCurrenWeek.response.total : null
    let oneWeekAgoData2 = searchWord2DataOneWeekBack ? searchWord2DataOneWeekBack.response.total : null
    let twoWeeksAgoData2 = searchWord2DataTwoWeeksBack ? searchWord2DataTwoWeeksBack.response.total : null


    let dataObjsArr = [
        searchWord1DataCurrenWeek,
        searchWord1DataOneWeekBack,
        searchWord1DataTwoWeeksBack,
        searchWord2DataCurrenWeek,
        searchWord2DataOneWeekBack,
        searchWord2DataTwoWeeksBack,

    ]

    let dataResultsArr =
        [currentWeekData1,
            oneWeekAgoData1,
            twoWeeksAgoData1,
            currentWeekData2,
            oneWeekAgoData2,
            twoWeeksAgoData2]


    for (let i = 0; i < dataResultsArr.length; i++) {
        if (dataResultsArr[i] == 0) {
            dataResultsArr[i] = dataResultsArr[i] + 1
        }

    }


    let titles = {
        searchWord1: userWordsArr[0],
        searchWord2: userWordsArr[1]
    }

    let searchWord1Data = {
        currentWeekData1,
        oneWeekAgoData1,
        twoWeeksAgoData1
    }
    let searchWord2Data = {
        currentWeekData2,
        oneWeekAgoData2,
        twoWeeksAgoData2,
    }


    let dataObjTotalResults = {
        titles,
        searchWord1Data,
        searchWord2Data
    }

    // let dataObj = {
    //     titles: {...titles},
    //     searchWord1Data: {...searchWord1Data},
    //     searchWord2Data: {...searchWord2Data},
    //     searchWord3Data: {...searchWord3Data}
    // }

    return (
        <div>
            {dataResultsArr &&
                <DashboardGraphs firebase={firebase} uid={uid} userWordsArr={userWordsArr} data={dataObjTotalResults} dataObjsArr={dataObjsArr} />

            }

        </div>
    )
}


const GraphData3Words = ({ firebase,
    uid,
    userWordsArr,
    searchWord1DataCurrenWeek,
    searchWord1DataOneWeekBack,
    searchWord1DataTwoWeeksBack,
    searchWord2DataCurrenWeek,
    searchWord2DataOneWeekBack,
    searchWord2DataTwoWeeksBack,
    searchWord3DataCurrenWeek,
    searchWord3DataOneWeekBack,
    searchWord3DataTwoWeeksBack }) => {



    let currentWeekData1 = searchWord1DataCurrenWeek ? searchWord1DataCurrenWeek.response.total : null
    let oneWeekAgoData1 = searchWord1DataOneWeekBack ? searchWord1DataOneWeekBack.response.total : null
    let twoWeeksAgoData1 = searchWord1DataTwoWeeksBack ? searchWord1DataTwoWeeksBack.response.total : null

    let currentWeekData2 = searchWord2DataCurrenWeek ? searchWord2DataCurrenWeek.response.total : null
    let oneWeekAgoData2 = searchWord2DataOneWeekBack ? searchWord2DataOneWeekBack.response.total : null
    let twoWeeksAgoData2 = searchWord2DataTwoWeeksBack ? searchWord2DataTwoWeeksBack.response.total : null

    let currentWeekData3 = searchWord3DataCurrenWeek ? searchWord3DataCurrenWeek.response.total : null
    let oneWeekAgoData3 = searchWord3DataOneWeekBack ? searchWord3DataOneWeekBack.response.total : null
    let twoWeeksAgoData3 = searchWord3DataTwoWeeksBack ? searchWord3DataTwoWeeksBack.response.total : null

    let dataObjsArr = [
        searchWord1DataCurrenWeek,
        searchWord1DataOneWeekBack,
        searchWord1DataTwoWeeksBack,
        searchWord2DataCurrenWeek,
        searchWord2DataOneWeekBack,
        searchWord2DataTwoWeeksBack,
        searchWord3DataCurrenWeek,
        searchWord3DataOneWeekBack,
        searchWord3DataTwoWeeksBack
    ]

    let dataResultsArr =
        [currentWeekData1,
            oneWeekAgoData1,
            twoWeeksAgoData1,
            currentWeekData2,
            oneWeekAgoData2,
            twoWeeksAgoData2,
            currentWeekData3,
            oneWeekAgoData3,
            twoWeeksAgoData3]


    for (let i = 0; i < dataResultsArr.length; i++) {
        if (dataResultsArr[i] == 0) {
            dataResultsArr[i] = dataResultsArr[i] + 1
        }

    }


    let titles = {
        searchWord1: userWordsArr[0],
        searchWord2: userWordsArr[1],
        searchWord3: userWordsArr[2]
    }

    let searchWord1Data = {
        currentWeekData1,
        oneWeekAgoData1,
        twoWeeksAgoData1
    }
    let searchWord2Data = {
        currentWeekData2,
        oneWeekAgoData2,
        twoWeeksAgoData2,
    }
    let searchWord3Data = {
        currentWeekData3,
        oneWeekAgoData3,
        twoWeeksAgoData3,
    }

    let dataObjTotalResults = {
        titles,
        searchWord1Data,
        searchWord2Data,
        searchWord3Data
    }

    // let dataObj = {
    //     titles: {...titles},
    //     searchWord1Data: {...searchWord1Data},
    //     searchWord2Data: {...searchWord2Data},
    //     searchWord3Data: {...searchWord3Data}
    // }

    return (
        <div>
            {dataResultsArr &&
                <DashboardGraphs firebase={firebase} uid={uid} userWordsArr={userWordsArr} data={dataObjTotalResults} dataObjsArr={dataObjsArr} />

            }

        </div>
    )
}


export default (withFirebase(Dashboard));