import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import { Doughnut, Line, Bar } from 'react-chartjs-2';

import styled from 'styled-components';

import { ChoosenWordsCard } from '../SearchWordForm'

import { PageTitle } from '../Account'


const NewDashboard = ({ firebase }) => {
    // const [userWord1, setUserWord1] = useState("")
    // const [userWord2, setUserWord2] = useState("")
    // const [userWord3, setUserWord3] = useState("")

    const [userWordsArr, setUserWordsArr] = useState(null)

    //Getting the unique id of the signed in user from the context provider
    //so we can use it to link the user to their firebase data profile
    let { uid } = useContext(AuthUserContext);

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('searchWords')
            .on('value', snapshot => {
                if (snapshot) {
                    const searchWordsObject = snapshot.val();
                    if (searchWordsObject) {
                        let searchWordArray = Object.keys(searchWordsObject)
                        //Here we take our array of the users searchwords from firebase and
                        //"set" in their own useState variable
                        // setUserWord1(searchWordArray[0])
                        // setUserWord2(searchWordArray[1])
                        // setUserWord3(searchWordArray[2])
                        setUserWordsArr(searchWordArray)
                        console.log("hej från useeffect som sätter sökorden")

                    } else {
                        //Resets the useState variables if something happens to the users words
                        // setUserWord1("");
                        // setUserWord2("");
                        // setUserWord3("");
                        setUserWordsArr([]);
                    }
                }
            });
        return () => {
            unsubscribe();
        }

    }, []);



    return (
        <>
            <PageTitle>Dashboard</PageTitle>
            {userWordsArr &&
                <DatesComp userWordsArr={userWordsArr} />
            }
        </>

    )
}



const DatesComp = ({ userWordsArr }) => {
    //Several useStates for setting different states we will use later
    const [formattedDatesArr, setFormattedDatesArr] = useState(null);




    //Here we gather the timestap of when the page loads 
    const today = Date.now()
    //The other timestamps get greated using 1 week as milliseconds
    // let oneDayAgo = today - 86400000

    let oneDayAgo
    let twoDaysAgo
    let threeDaysAgo
    let fourDaysAgo
    let fiveDaysAgo
    let sixDaysAgo
    let sevenDaysAgo
    let eightDaysAgo
    let nineDaysAgo
    let tenDaysAgo
    let elevenDaysAgo
    let twelveDaysAgo
    let thirteenDaysAgo
    let fourteenDaysAgo

    let timestampsArr = [
        oneDayAgo,
        twoDaysAgo,
        threeDaysAgo,
        fourDaysAgo,
        fiveDaysAgo,
        sixDaysAgo,
        sevenDaysAgo,
        eightDaysAgo,
        nineDaysAgo,
        tenDaysAgo,
        elevenDaysAgo,
        twelveDaysAgo,
        thirteenDaysAgo,
        fourteenDaysAgo,
    ]

    useEffect(() => {

        let i, oneDayTimestamp
        for (i = 0, oneDayTimestamp = 86400000; i < timestampsArr.length; i++) {
            timestampsArr[i] = today - oneDayTimestamp;

            oneDayTimestamp = oneDayTimestamp + 86400000;

        }

        timestampsArr.unshift(today)

    }, []);


    // //Creates variable to use later
    let todayDate
    let oneDayAgoDate
    let twoDaysAgoDate
    let threeDaysAgoDate
    let fourDaysAgoDate
    let fiveDaysAgoDate
    let sixDaysAgoDate
    let sevenDaysAgoDate
    let eightDaysAgoDate
    let nineDaysAgoDate
    let tenDaysAgoDate
    let elevenDaysAgoDate
    let twelveDaysAgoDate
    let thirteenDaysAgoDate
    let fourteenDaysAgoDate


    //A function that takes a string, the index of where to place the new string, and the new string to add
    function addStr(str, index, stringToAdd) {
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    }

    //Places the variable in corresponding order in arrays to cycle through in the for loop below
    let datesArr = [
        todayDate,
        oneDayAgoDate,
        twoDaysAgoDate,
        threeDaysAgoDate,
        fourDaysAgoDate,
        fiveDaysAgoDate,
        sixDaysAgoDate,
        sevenDaysAgoDate,
        eightDaysAgoDate,
        nineDaysAgoDate,
        tenDaysAgoDate,
        elevenDaysAgoDate,
        twelveDaysAgoDate,
        thirteenDaysAgoDate,
        fourteenDaysAgoDate
    ]

    useEffect(() => {
        //For loop that takes the timestamps and recreates them as dates we can use in our fetch
        for (let i = 0; i < timestampsArr.length; i++) {
            datesArr[i] = new Date(timestampsArr[i])
            datesArr[i] = datesArr[i].getFullYear() + '-' + (datesArr[i].getMonth() + 1) + '-' + datesArr[i].getDate();


            if (datesArr[i].charAt(5) == 1 && datesArr[i].charAt(6) == 0 || datesArr[i].charAt(6) == 1 || datesArr[i].charAt(6) == 2) {
                console.log(datesArr[i] + ": " + "this date is correct")
            } else {
                datesArr[i] = (addStr(datesArr[i], 5, 0))
            }
            // console.log(datesArr[i])

        }
        console.log(datesArr)
        setFormattedDatesArr(datesArr)

    }, []);


    return (
        <>

            {/* syntax for conditional rendering: state1 && state2 && state3 && <FetchComp states={[state1,state2,state3]} />*/}

            {
                formattedDatesArr &&

                <UrlComp
                    userWordsArr={userWordsArr}
                    formattedDatesArr={formattedDatesArr}
                />
            }
        </>
    )

}

const UrlComp = ({ userWordsArr, formattedDatesArr }) => {
    if (!userWordsArr) {
        console.log("This should never appear")
    }
    const [urlsArr, setUrlsArr] = useState(null)
    //Setting some variables that we need for creating the full url we'll use in our api fetches
    const Url = "https://content.guardianapis.com/search?q="
    const Key = "&api-key=5302bcc3-f459-4d4e-93e3-8f8ef66ae980"
    // const Country = "&country"
    // const Lang = "&lang"
    const From = "&from-date="
    const To = "&to-date="

    let urlUserword1Today
    let urlUserword1OneDayAgo
    let urlUserword1TwoDaysAgo
    let urlUserword1ThreeDaysAgo
    let urlUserword1FourDaysAgo
    let urlUserword1FiveDaysAgo
    let urlUserword1SixDaysAgo
    let urlUserword1SevenDaysAgo
    let urlUserword1EightDaysAgo
    let urlUserword1NineDaysAgo
    let urlUserword1TenDaysAgo
    let urlUserword1ElevenDaysAgo
    let urlUserword1TwelveDaysAgo
    let urlUserword1ThirteenDaysAgo
    let urlUserword1FourteenDaysAgo

    let urlUserword2Today
    let urlUserword2OneDayAgo
    let urlUserword2TwoDaysAgo
    let urlUserword2ThreeDaysAgo
    let urlUserword2FourDaysAgo
    let urlUserword2FiveDaysAgo
    let urlUserword2SixDaysAgo
    let urlUserword2SevenDaysAgo
    let urlUserword2EightDaysAgo
    let urlUserword2NineDaysAgo
    let urlUserword2TenDaysAgo
    let urlUserword2ElevenDaysAgo
    let urlUserword2TwelveDaysAgo
    let urlUserword2ThirteenDaysAgo
    let urlUserword2FourteenDaysAgo

    let urlUserword3Today
    let urlUserword3OneDayAgo
    let urlUserword3TwoDaysAgo
    let urlUserword3ThreeDaysAgo
    let urlUserword3FourDaysAgo
    let urlUserword3FiveDaysAgo
    let urlUserword3SixDaysAgo
    let urlUserword3SevenDaysAgo
    let urlUserword3EightDaysAgo
    let urlUserword3NineDaysAgo
    let urlUserword3TenDaysAgo
    let urlUserword3ElevenDaysAgo
    let urlUserword3TwelveDaysAgo
    let urlUserword3ThirteenDaysAgo
    let urlUserword3FourteenDaysAgo

    let userword1UrlArr = [
        urlUserword1Today,
        urlUserword1OneDayAgo,
        urlUserword1TwoDaysAgo,
        urlUserword1ThreeDaysAgo,
        urlUserword1FourDaysAgo,
        urlUserword1FiveDaysAgo,
        urlUserword1SixDaysAgo,
        urlUserword1SevenDaysAgo,
        urlUserword1EightDaysAgo,
        urlUserword1NineDaysAgo,
        urlUserword1TenDaysAgo,
        urlUserword1ElevenDaysAgo,
        urlUserword1TwelveDaysAgo,
        urlUserword1ThirteenDaysAgo,
        urlUserword1FourteenDaysAgo,

    ]
    let userword2UrlArr = [
        urlUserword2Today,
        urlUserword2OneDayAgo,
        urlUserword2TwoDaysAgo,
        urlUserword2ThreeDaysAgo,
        urlUserword2FourDaysAgo,
        urlUserword2FiveDaysAgo,
        urlUserword2SixDaysAgo,
        urlUserword2SevenDaysAgo,
        urlUserword2EightDaysAgo,
        urlUserword2NineDaysAgo,
        urlUserword2TenDaysAgo,
        urlUserword2ElevenDaysAgo,
        urlUserword2TwelveDaysAgo,
        urlUserword2ThirteenDaysAgo,
        urlUserword2FourteenDaysAgo,
    ]
    let userword3UrlArr = [
        urlUserword3Today,
        urlUserword3OneDayAgo,
        urlUserword3TwoDaysAgo,
        urlUserword3ThreeDaysAgo,
        urlUserword3FourDaysAgo,
        urlUserword3FiveDaysAgo,
        urlUserword3SixDaysAgo,
        urlUserword3SevenDaysAgo,
        urlUserword3EightDaysAgo,
        urlUserword3NineDaysAgo,
        urlUserword3TenDaysAgo,
        urlUserword3ElevenDaysAgo,
        urlUserword3TwelveDaysAgo,
        urlUserword3ThirteenDaysAgo,
        urlUserword3FourteenDaysAgo,
    ]

    let allUrlsArr = []

    if (!urlsArr) {
        console.log("Hejsan från urlComp 2")

        if (userWordsArr[0]) {
            for (let j = 0; j < userword1UrlArr.length; j++) {
                userword1UrlArr[j] = Url + userWordsArr[0] + From + formattedDatesArr[j] + To + formattedDatesArr[j] + Key
            }
            allUrlsArr.push(userword1UrlArr)
        }

        if (userWordsArr[1]) {
            for (let j = 0; j < userword2UrlArr.length; j++) {
                userword2UrlArr[j] = Url + userWordsArr[1] + From + formattedDatesArr[j] + To + formattedDatesArr[j] + Key
            }
            allUrlsArr.push(userword2UrlArr)
        }

        if (userWordsArr[2]) {
            for (let j = 0; j < userword3UrlArr.length; j++) {
                userword3UrlArr[j] = Url + userWordsArr[2] + From + formattedDatesArr[j] + To + formattedDatesArr[j] + Key
            }
            allUrlsArr.push(userword3UrlArr)
        }

        setUrlsArr(allUrlsArr)

        // console.log(userword1UrlArr)
        // console.log(userword2UrlArr)
        // console.log(userword3UrlArr)

    } else {
        console.log("urlsArr unset")
    }

    console.log(urlsArr)

    console.log("Hejsan från UrlComp");

    return (
        <>
            <h1>UrlComp</h1>

            {
                urlsArr &&
                <FetchComp
                    userWordsArr={userWordsArr}
                    urlsArr={urlsArr} />

            }
        </>
    )
}

const FetchComp = ({ urlsArr, userWordsArr }) => {
    if (!urlsArr) {
        console.log("This should never appear")
    }

    const [allDataObjs, setAllDataObjs] = useState(null)
    const [fetchedData1, setFetchedData1] = useState(null)
    useEffect(() => {
        console.log("hej från useeffect FC")
        fetchedDataArr1 =[];
        if(fetchedData1){
            console.log(fetchedData1[0])
        }
    }, [fetchedData1])

    //Creating all the variable that will be placed in an array
    let todayData1 = {},
        oneDayAgoData1 = {},
        twoDaysAgoData1 = {},
        threeDaysAgoData1 = {},
        fourDaysAgoData1 = {},
        fiveDaysAgoData1 = {},
        sixDaysAgoData1 = {},
        sevenDaysAgoData1 = {},
        eightDaysAgoData1 = {},
        nineDaysAgoData1 = {},
        tenDaysAgoData1 = {},
        elevenDaysAgoData1 = {},
        twelveDaysAgoData1 = {},
        thirteenDaysAgoData1 = {},
        fourteenDaysAgoData1 = {},
        todayData2 = {},
        oneDayAgoData2 = {},
        twoDaysAgoData2 = {},
        threeDaysAgoData2 = {},
        fourDaysAgoData2 = {},
        fiveDaysAgoData2 = {},
        sixDaysAgoData2 = {},
        sevenDaysAgoData2 = {},
        eightDaysAgoData2 = {},
        nineDaysAgoData2 = {},
        tenDaysAgoData2 = {},
        elevenDaysAgoData2 = {},
        twelveDaysAgoData2 = {},
        thirteenDaysAgoData2 = {},
        fourteenDaysAgoData2 = {},
        todayData3 = {},
        oneDayAgoData3 = {},
        twoDaysAgoData3 = {},
        threeDaysAgoData3 = {},
        fourDaysAgoData3 = {},
        fiveDaysAgoData3 = {},
        sixDaysAgoData3 = {},
        sevenDaysAgoData3 = {},
        eightDaysAgoData3 = {},
        nineDaysAgoData3 = {},
        tenDaysAgoData3 = {},
        elevenDaysAgoData3 = {},
        twelveDaysAgoData3 = {},
        thirteenDaysAgoData3 = {},
        fourteenDaysAgoData3 = {}


    //Placing all the variables in an array so we can loop through them later on
    /*
    let fetchedDataArr1 = [
        todayData1,
        oneDayAgoData1,
        twoDaysAgoData1,
        threeDaysAgoData1,
        fourDaysAgoData1,
        fiveDaysAgoData1,
        sixDaysAgoData1,
        sevenDaysAgoData1,
        eightDaysAgoData1,
        nineDaysAgoData1,
        tenDaysAgoData1,
        elevenDaysAgoData1,
        twelveDaysAgoData1,
        thirteenDaysAgoData1,
        fourteenDaysAgoData1
    ]
    */
   console.log("Nu ryker fetcheddataarr1")
    let fetchedDataArr1;

    let fetchedDataArr2 = [
        todayData2,
        oneDayAgoData2,
        twoDaysAgoData2,
        threeDaysAgoData2,
        fourDaysAgoData2,
        fiveDaysAgoData2,
        sixDaysAgoData2,
        sevenDaysAgoData2,
        eightDaysAgoData2,
        nineDaysAgoData2,
        tenDaysAgoData2,
        elevenDaysAgoData2,
        twelveDaysAgoData2,
        thirteenDaysAgoData2,
        fourteenDaysAgoData2
    ]

    let fetchedDataArr3 = [
        todayData3,
        oneDayAgoData3,
        twoDaysAgoData3,
        threeDaysAgoData3,
        fourDaysAgoData3,
        fiveDaysAgoData3,
        sixDaysAgoData3,
        sevenDaysAgoData3,
        eightDaysAgoData3,
        nineDaysAgoData3,
        tenDaysAgoData3,
        elevenDaysAgoData3,
        twelveDaysAgoData3,
        thirteenDaysAgoData3,
        fourteenDaysAgoData3,
    ]

    let allFechedData = []

    let userWord1Urls = urlsArr[0]
    let userWord2Urls = urlsArr[1]
    let userWord3Urls = urlsArr[2]

    // if (!allDataObjs) {
    useEffect(() => {
        if (urlsArr[0]) {
            //The following syntax for the loops together with the setTimeout function was sampeled from https://stackoverflow.com/a/24293516
            console.log("Första for loppen körs");
            for (let i = 0; i < userWord1Urls.length; i++) {
                ((index) => {
                    console.log("index: " + index)
                    setTimeout(function () {
                        fetch(userWord1Urls[i])
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                fetchedDataArr1.push(JSON.parse(JSON.stringify(data))); 
                                //console.log(data)
                                //fetchedDataArr1[i] = JSON.parse(JSON.stringify(data));   
                                console.log(fetchedDataArr1)
                            })
                            .catch((err) => {
                                console.log("oops..something went wrong", err)
                            }
                            )

                    }, 100 + (10 * index));
                })(i);
            }
            //console.log(fetchedDataArr1)
            setFetchedData1(fetchedDataArr1)
        };

        if (urlsArr[1]) {
            console.log("Andra for loppen körs");
            for (let i = 0; i < userWord2Urls.length; i++) {
                (function (index) {
                    setTimeout(function () {
                        fetch(userWord2Urls[i])
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                fetchedDataArr2[i] = data
                            })
                            .catch((err) => {
                                console.log("oops..something went wrong", err)
                            }
                            )

                    }, 100 + (10 * index));
                })(i);
            }
        }

        if (urlsArr[2]) {
            console.log("Tredje for loppen körs");
            for (let i = 0; i < userWord3Urls.length; i++) {
                ((index) => {
                    setTimeout(function () {
                        fetch(userWord3Urls[i])
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                fetchedDataArr3[i] = data
                            })
                            .catch((err) => {
                                console.log("oops..something went wrong", err)
                            }
                            )

                    }, 100 + (10 * index));
                })(i);
            }
            // allFechedData = {
            //     fetchedDataArr1: fetchedDataArr1,
            //     fetchedDataArr2: fetchedDataArr2,
            //     fetchedDataArr3: fetchedDataArr3

            // }
            // allFechedData.push(fetchedDataArr1, fetchedDataArr2, fetchedDataArr3)
            // console.log("ALLDATA", allFechedData)
        }
        // setAllDataObjs(allFechedData)
        
    }, [])

 
    // } else {
    //     console.log("dataObjs unset")
    // }
    // if(fetchedData1){
    //     console.log(fetchedData1[0])
    // }
    

    return (
        <>
            
            <h1>FetchComp</h1>
            {/* {   allDataObjs &&
                <GraphData allDataObjs={allDataObjs} userWordsArr={userWordsArr}/>
            } */}
            
            
        </>

    )
}


const GraphData = ({ allDataObjs, userWordsArr }) => {
    if (!allDataObjs) {
        console.log("This should never appear")
    } 
    
    let userWord1Data = allDataObjs[0]
    // console.log(allDataObjs)
    let obj1 = {
        name: {
            Viktor: "Viktor"
        }
    }
    let obj2 = {
        name: {
            Nisse: "Nisse"
        }
    }
    let obj3 = {
        name: {
            Albin: "Albin"
        }
    }

    let arr = []
    arr.push(obj1, obj2, obj3)

    console.log("Hej från GraphData!");
    
    console.log(userWord1Data[0].response)

    console.log(arr[0].name)

    // console.log(arr[0])

    let todayDataTotalRes1,
    oneDayAgoDataTotalRes1,
    twoDaysAgoDataTotalRes1,
    threeDaysAgoDataTotalRes1,
    fourDaysAgoDataTotalRes1,
    fiveDaysAgoDataTotalRes1,
    sixDaysAgoDataTotalRes1,
    sevenDaysAgoDataTotalRes1,
    eightDaysAgoDataTotalRes1,
    nineDaysAgoDataTotalRes1,
    tenDaysAgoDataTotalRes1,
    elevenDaysAgoDataTotalRes1,
    twelveDaysAgoDataTotalRes1,
    thirteenDaysAgoDataTotalRes1,
    fourteenDaysAgoDataTotalRes1,
    todayDataTotalRes2,
    oneDayAgoDataTotalRes2,
    twoDaysAgoDataTotalRes2,
    threeDaysAgoDataTotalRes2,
    fourDaysAgoDataTotalRes2,
    fiveDaysAgoDataTotalRes2,
    sixDaysAgoDataTotalRes2,
    sevenDaysAgoDataTotalRes2,
    eightDaysAgoDataTotalRes2,
    nineDaysAgoDataTotalRes2,
    tenDaysAgoDataTotalRes2,
    elevenDaysAgoDataTotalRes2,
    twelveDaysAgoDataTotalRes2,
    thirteenDaysAgoDataTotalRes2,
    fourteenDaysAgoDataTotalRes2,
    todayDataTotalRes3,
    oneDayAgoDataTotalRes3,
    twoDaysAgoDataTotalRes3,
    threeDaysAgoDataTotalRes3,
    fourDaysAgoDataTotalRes3,
    fiveDaysAgoDataTotalRes3,
    sixDaysAgoDataTotalRes3,
    sevenDaysAgoDataTotalRes3,
    eightDaysAgoDataTotalRes3,
    nineDaysAgoDataTotalRes3,
    tenDaysAgoDataTotalRes3,
    elevenDaysAgoDataTotalRes3,
    twelveDaysAgoDataTotalRes3,
    thirteenDaysAgoDataTotalRes3,
    fourteenDaysAgoDataTotalRes3
    
    let totalResultDataArr1 = [
        todayDataTotalRes1,
        oneDayAgoDataTotalRes1,
        twoDaysAgoDataTotalRes1,
        threeDaysAgoDataTotalRes1,
        fourDaysAgoDataTotalRes1,
        fiveDaysAgoDataTotalRes1,
        sixDaysAgoDataTotalRes1,
        sevenDaysAgoDataTotalRes1,
        eightDaysAgoDataTotalRes1,
        nineDaysAgoDataTotalRes1,
        tenDaysAgoDataTotalRes1,
        elevenDaysAgoDataTotalRes1,
        twelveDaysAgoDataTotalRes1,
        thirteenDaysAgoDataTotalRes1,
        fourteenDaysAgoDataTotalRes1
    ]
    let totalResultDataArr2 = [
        todayDataTotalRes2,
        oneDayAgoDataTotalRes2,
        twoDaysAgoDataTotalRes2,
        threeDaysAgoDataTotalRes2,
        fourDaysAgoDataTotalRes2,
        fiveDaysAgoDataTotalRes2,
        sixDaysAgoDataTotalRes2,
        sevenDaysAgoDataTotalRes2,
        eightDaysAgoDataTotalRes2,
        nineDaysAgoDataTotalRes2,
        tenDaysAgoDataTotalRes2,
        elevenDaysAgoDataTotalRes2,
        twelveDaysAgoDataTotalRes2,
        thirteenDaysAgoDataTotalRes2,
        fourteenDaysAgoDataTotalRes2
    ]
    let totalResultDataArr3 = [
        todayDataTotalRes3,
        oneDayAgoDataTotalRes3,
        twoDaysAgoDataTotalRes3,
        threeDaysAgoDataTotalRes3,
        fourDaysAgoDataTotalRes3,
        fiveDaysAgoDataTotalRes3,
        sixDaysAgoDataTotalRes3,
        sevenDaysAgoDataTotalRes3,
        eightDaysAgoDataTotalRes3,
        nineDaysAgoDataTotalRes3,
        tenDaysAgoDataTotalRes3,
        elevenDaysAgoDataTotalRes3,
        twelveDaysAgoDataTotalRes3,
        thirteenDaysAgoDataTotalRes3,
        fourteenDaysAgoDataTotalRes3
    ]

    

    useEffect(() => {
        if(userWordsArr[0]){

            
            for(let i = 0; i < totalResultDataArr1.length; i++){
                
                // totalResultDataArr1 = allDataObjs[i].response.total
                // console.log(totalResultDataArr1)
            }
        }
    }, [])



    // let currentWeekData1 = searchWord1DataCurrenWeek ? searchWord1DataCurrenWeek.response.total : null
    // let oneWeekAgoData1 = searchWord1DataOneWeekBack ? searchWord1DataOneWeekBack.response.total : null
    // let twoWeeksAgoData1 = searchWord1DataTwoWeeksBack ? searchWord1DataTwoWeeksBack.response.total : null

    // let currentWeekData2 = searchWord2DataCurrenWeek ? searchWord2DataCurrenWeek.response.total : null
    // let oneWeekAgoData2 = searchWord2DataOneWeekBack ? searchWord2DataOneWeekBack.response.total : null
    // let twoWeeksAgoData2 = searchWord2DataTwoWeeksBack ? searchWord2DataTwoWeeksBack.response.total : null

    // let currentWeekData3 = searchWord3DataCurrenWeek ? searchWord3DataCurrenWeek.response.total : null
    // let oneWeekAgoData3 = searchWord3DataOneWeekBack ? searchWord3DataOneWeekBack.response.total : null
    // let twoWeeksAgoData3 = searchWord3DataTwoWeeksBack ? searchWord3DataTwoWeeksBack.response.total : null


    // let dataArr =
    //     [currentWeekData1,
    //         oneWeekAgoData1,
    //         twoWeeksAgoData1,
    //         currentWeekData2,
    //         oneWeekAgoData2,
    //         twoWeeksAgoData2,
    //         currentWeekData3,
    //         oneWeekAgoData3,
    //         twoWeeksAgoData3]



    // console.log(dataArr[2])



    // for (let i = 0; i < dataArr.length; i++) {
    //     if (dataArr[i] == 0) {
    //         dataArr[i] = dataArr[i] + 1
    //     }
    //     console.log(dataArr[i])
    // }

    // console.log(dataArr)

    // let titles = {
    //     searchWord1: userWord1,
    //     searchWord2: userWord2,
    //     searchWord3: userWord3
    // }

    // let searchWord1Data = {
    //     currentWeekData1,
    //     oneWeekAgoData1,
    //     twoWeeksAgoData1
    // }
    // let searchWord2Data = {
    //     currentWeekData2,
    //     oneWeekAgoData2,
    //     twoWeeksAgoData2,
    // }
    // let searchWord3Data = {
    //     currentWeekData3,
    //     oneWeekAgoData3,
    //     twoWeeksAgoData3,
    // }

    // let dataObj = {
    //     titles,
    //     searchWord1Data,
    //     searchWord2Data,
    //     searchWord3Data
    // }


    return (
        <div>
            <h1>GraphData</h1>

            {/* {dataArr &&
                <DashboardGraph data={dataObj} />
            } */}

        </div>
    )
}

// const GraphDiv = styled(ChoosenWordsCard)`
// width: 600px;
// `



// const DashboardGraph = ({ data }) => {
//     console.log(data.searchWord1Data.currentWeekData1)
//     const dataSetsData = {
//         labels: [
//             // props.dataObj.titles.searchWord1
//             "Two weeks ago",
//             "Last week",
//             "This week"
//         ],
//         datasets: [

//             {
//                 label: data.titles.searchWord1,
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: 'yellow',
//                 borderColor: 'yellow',
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: 'yellow',
//                 pointBackgroundColor: '#fff',
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: 'yellow',
//                 pointHoverBorderColor: 'yellow',
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 data: [data.searchWord1Data.twoWeeksAgoData1, data.searchWord1Data.oneWeekAgoData1, data.searchWord1Data.currentWeekData1]
//             },
//             {
//                 label: data.titles.searchWord2,
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: 'red',
//                 borderColor: 'red',
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: 'red',
//                 pointBackgroundColor: '#fff',
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: 'red',
//                 pointHoverBorderColor: 'darkred',
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 data: [data.searchWord2Data.twoWeeksAgoData2, data.searchWord2Data.oneWeekAgoData2, data.searchWord2Data.currentWeekData2]
//             },
//             {
//                 label: data.titles.searchWord3,
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: 'green',
//                 borderColor: 'green',
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: 'green',
//                 pointBackgroundColor: '#fff',
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: 'green',
//                 pointHoverBorderColor: 'darkgreen',
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 data: [data.searchWord3Data.twoWeeksAgoData3, data.searchWord3Data.oneWeekAgoData3, data.searchWord3Data.currentWeekData3]
//             }]
//     };
//     const options = {
//         "legend": {
//             "labels": {
//                 "fontColor": "white",
//                 "fontSize": 15
//             }
//         },
//         "maintainAspectRatio": true,
//         "scales": {
//             "yAxes": [
//                 {
//                     "gridLines": {
//                         "color": "white",
//                         "borderDash": [
//                             0,
//                             0
//                         ]
//                     },
//                     "ticks": {
//                         "beginAtZero": true,
//                         "fontColor": 'white'
//                     }
//                 }
//             ],
//             "xAxes": [
//                 {
//                     "gridLines": {
//                         "color": "#fff",
//                         "borderDash": [
//                             0,
//                             0
//                         ]
//                     },
//                     "ticks": {
//                         "autoSkip": true,
//                         "autoSkipPadding": 40,
//                         "maxRotation": 0,
//                         "fontColor": 'white'
//                     }
//                 }
//             ]
//         },
//         "layout": {
//             "padding": 10,
//         },
//         "tooltips": {
//             "enabled": true,
//             "mode": "x",
//             "intersect": true,
//         }
//     };
//     return (
//         <GraphDiv>
//             <Bar data={dataSetsData} options={options} />
//         </GraphDiv>
//     )
// }

export default (withFirebase(NewDashboard));