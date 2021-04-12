import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import { Doughnut, Line, Bar } from 'react-chartjs-2';
/*
let dataObj = {
    Amazon: {"Two weeks ago": 45,
 "Last week": 30,
 "This week": 3},
  Tesla: 


 Object.keys(dataObj) -> ["Amazon", "...", "..."]
 Object.values(dataObj) -> [{"Two weeks ago": 45,
 "Last week": 30,
 "This week": 3}, {...}]

 let dataArr = Object.keys(dataObj).map(searchWord => ({...dataObj[searchWord], searchWord: searchWord})
    [{"Two weeks ago": 45,
 "Last week": 30,
 "This week": 3,
searchWord: "Amazon"}
 */

const DashboardGraph = ( {data} ) => {
    console.log(data.searchWord1Data.currentWeekData1)
    const dataSetsData = {
        labels: [ 
            // props.dataObj.titles.searchWord1
            "Two weeks ago",
            "Last week",
            "This week"
        ],
        datasets: [
            
            {
            label: data.titles.searchWord1,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord1Data.twoWeeksAgoData1, data.searchWord1Data.oneWeekAgoData1, data.searchWord1Data.currentWeekData1]
        },
        {
            label: data.titles.searchWord2,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'red',
            borderColor: 'red',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'red',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'red',
            pointHoverBorderColor: 'darkred',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord2Data.twoWeeksAgoData2, data.searchWord2Data.oneWeekAgoData2, data.searchWord2Data.currentWeekData2]
        },
        {
            label: data.titles.searchWord3,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'green',
            borderColor: 'green',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'green',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'green',
            pointHoverBorderColor: 'darkgreen',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord3Data.twoWeeksAgoData3, data.searchWord3Data.oneWeekAgoData3, data.searchWord3Data.currentWeekData3]
        },
    ]
    }

    return (
        <div>
            <Bar data={dataSetsData}/>
            <h1></h1>
        </div>
    )
}


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

    

    const searchWordDataArr = [0]

    //Here we get the full URL from the user, it contains one search word, a from date, a to date, the selected country and language
    // console.log(Url + userWord1 + From + formatted1WeekAgo + Time + To + formattedTodayDate + Time + Country + userCountry + Lang + userLanguage + Key)

    //Getting the unique id of the signed in user from the context provider
    //so we can use it to link the user to their firebase data profile
    let { uid } = useContext(AuthUserContext);
    console.log(useContext(AuthUserContext).uid)

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
                        console.log("hej från useeffect m weeks")

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

    //In the two useEffects below we do the same with the users selected country and language
    // useEffect(() => {
    //     const unsubscribe = firebase.user(uid).child('settings').child('country')
    //         .on('value', snapshot => {
    //             if (snapshot) {
    //                 const countryObj = snapshot.val();
    //                 if (countryObj) {
    //                     let userCountry = Object.keys(countryObj)
    //                     setUserCountry(userCountry[0])

    //                 } else {
    //                     setUserCountry("")
    //                 }
    //             }
    //         });
    //     return () => {
    //         unsubscribe();
    //     }

    // }, []); // här stod userwords

    // useEffect(() => {
    //     const unsubscribe = firebase.user(uid).child('settings').child('language')
    //         .on('value', snapshot => {
    //             if (snapshot) {
    //                 const languageObject = snapshot.val();
    //                 if (languageObject) {
    //                     let userLanguageArr = Object.keys(languageObject)
    //                     setUserLanguage(userLanguageArr[0])
    //                     let trigger = 1

    //                 } else {
    //                     setUserLanguage("")
    //                 }
    //             }
    //         });
    //     return () => {
    //         unsubscribe();
    //     }

    // }, []); // här stod userwords

    // useEffect (() => {
    //     console.log(userWordsArr);
    //     console.log(userWord1,userWord2,userWord3)
    //     console.log(searchWord1DataCurrenWeek)
    //     console.log(searchWord2DataCurrenWeek)
    //     console.log(searchWord3DataCurrenWeek)
    // }, [searchWord3DataTwoWeeksBack] ) 


  

    return (
        <>
            <h1>Dashboard</h1>
            {/* syntax for conditional rendering: state1 && state2 && state3 && <FetchComp states={[state1,state2,state3]} />*/}

            {userWord1 &&
            userWord2 && 
            userWord3 && 
            formatted1WeekAgo && 
            formatted2WeekAgo &&
            formatted3WeekAgo && 
            formattedTodayDate && 
            <FetchComp 
                userWord1={userWord1}
                userWord2={userWord2}
                userWord3={userWord3}
                formatted1WeekAgo={formatted1WeekAgo}
                formatted2WeekAgo={formatted2WeekAgo}
                formatted3WeekAgo={formatted3WeekAgo}
                formattedTodayDate={formattedTodayDate}
            />
            }
        </>
    )

}

const FetchComp = ( {userWord1,
                    userWord2, 
                    userWord3, 
                    formatted1WeekAgo, 
                    formatted2WeekAgo, 
                    formatted3WeekAgo, 
                    formattedTodayDate, 
                    } ) => {
        
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
    // const Country = "&country"
    // const Lang = "&lang"
    const From = "&from-date="
    const To = "&to-date="

    console.log(userWord1);

    let fullUrlSearchWord1CurrentWeek = Url + userWord1 + From + formatted1WeekAgo  + To + formattedTodayDate + Key
    let fullUrlSearchWord1OneWeekBack = Url + userWord1 + From + formatted2WeekAgo  + To + formatted1WeekAgo + Key
    let fullUrlSearchWord1TwoWeeksBack = Url + userWord1 + From + formatted3WeekAgo  + To + formatted2WeekAgo + Key

    let fullUrlSearchWord2CurrentWeek = Url + userWord2 + From + formatted1WeekAgo  + To + formattedTodayDate + Key
    let fullUrlSearchWord2OneWeekBack = Url + userWord2 + From + formatted2WeekAgo  + To + formatted1WeekAgo + Key
    let fullUrlSearchWord2TwoWeeksBack = Url + userWord2 + From + formatted3WeekAgo  + To + formatted2WeekAgo + Key

    let fullUrlSearchWord3CurrentWeek = Url + userWord3 + From + formatted1WeekAgo  + To + formattedTodayDate + Key
    let fullUrlSearchWord3OneWeekBack = Url + userWord3 + From + formatted2WeekAgo  + To + formatted1WeekAgo + Key
    let fullUrlSearchWord3TwoWeeksBack = Url + userWord3 + From + formatted3WeekAgo  + To + formatted2WeekAgo + Key

    
    useEffect(() => {
        // förslag todo: bryt ut i separat komponent
        function bigFetch() {

        setTimeout(function(){fetch(fullUrlSearchWord1CurrentWeek)
        .then(response => {return response.json();})
        .then(data => {setSearchWord1DataCurrentWeek(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},100)

        setTimeout(function(){fetch(fullUrlSearchWord1OneWeekBack)
        .then(response => {return response.json();})
        .then(data => {setSearchWord1DataOneWeekBack(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},200)

        setTimeout(function(){fetch(fullUrlSearchWord1TwoWeeksBack)
        .then(response => {return response.json();})
        .then(data => {setSearchWord1DataTwoWeeksBack(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},300)

        setTimeout(function(){fetch(fullUrlSearchWord2CurrentWeek)
        .then(response => {return response.json();})
        .then(data => {setSearchWord2DataCurrentWeek(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},400)

        setTimeout(function(){fetch(fullUrlSearchWord2OneWeekBack)
        .then(response => {return response.json();})
        .then(data => {setSearchWord2DataOneWeekBack(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},500)

        setTimeout(function(){fetch(fullUrlSearchWord2TwoWeeksBack)
        .then(response => {return response.json();})
        .then(data => {setSearchWord2DataTwoWeeksBack(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},600)

        setTimeout(function(){fetch(fullUrlSearchWord3CurrentWeek)
        .then(response => {return response.json();})
        .then(data => {setSearchWord3DataCurrentWeek(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},700)

        setTimeout(function(){fetch(fullUrlSearchWord3OneWeekBack)
        .then(response => {return response.json();})
        .then(data => {setSearchWord3DataOneWeekBack(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},800)

        setTimeout(function(){fetch(fullUrlSearchWord3TwoWeeksBack)
        .then(response => {return response.json();})
        .then(data => {setSearchWord3DataTwoWeeksBack(data)}) 
        .catch((err)=>{console.log("oops..something went wrong", err)})},900)
        }

        bigFetch()

        console.log(fullUrlSearchWord1CurrentWeek, fullUrlSearchWord2CurrentWeek, fullUrlSearchWord3CurrentWeek)
    }, []);

    
    return ( 
        <>
            {userWord1 &&
            userWord2 && 
            userWord3 &&
            searchWord1DataCurrenWeek && 
            searchWord1DataOneWeekBack &&
            searchWord1DataTwoWeeksBack&&
            searchWord2DataCurrenWeek&&
            searchWord2DataOneWeekBack&& 
            searchWord2DataTwoWeeksBack&& 
            searchWord3DataCurrenWeek&& 
            searchWord3DataOneWeekBack&& 
            searchWord3DataTwoWeeksBack&&
            <GraphData  
                userWord1={userWord1}
                userWord2={userWord2} 
                userWord3={userWord3} 
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


const GraphData = ( {userWord1,
                    userWord2, 
                    userWord3, 
                    searchWord1DataCurrenWeek, 
                    searchWord1DataOneWeekBack, 
                    searchWord1DataTwoWeeksBack, 
                    searchWord2DataCurrenWeek, 
                    searchWord2DataOneWeekBack, 
                    searchWord2DataTwoWeeksBack, 
                    searchWord3DataCurrenWeek, 
                    searchWord3DataOneWeekBack, 
                    searchWord3DataTwoWeeksBack} ) => {


     
    let currentWeekData1 = searchWord1DataCurrenWeek ? searchWord1DataCurrenWeek.response.total : null
    let oneWeekAgoData1 = searchWord1DataOneWeekBack ? searchWord1DataOneWeekBack.response.total : null
    let twoWeeksAgoData1 = searchWord1DataTwoWeeksBack ? searchWord1DataTwoWeeksBack.response.total : null

    let currentWeekData2 = searchWord2DataCurrenWeek ? searchWord2DataCurrenWeek.response.total : null
    let oneWeekAgoData2 = searchWord2DataOneWeekBack ? searchWord2DataOneWeekBack.response.total : null
    let twoWeeksAgoData2 = searchWord2DataTwoWeeksBack ? searchWord2DataTwoWeeksBack.response.total : null

    let currentWeekData3 = searchWord3DataCurrenWeek ? searchWord3DataCurrenWeek.response.total : null
    let oneWeekAgoData3 = searchWord3DataOneWeekBack ? searchWord3DataOneWeekBack.response.total : null
    let twoWeeksAgoData3 = searchWord3DataTwoWeeksBack ? searchWord3DataTwoWeeksBack.response.total : null


    let dataArr = 
        [currentWeekData1,
         oneWeekAgoData1, 
         twoWeeksAgoData1, 
         currentWeekData2, 
         oneWeekAgoData2, 
         twoWeeksAgoData2, 
         currentWeekData3, 
         oneWeekAgoData3, 
         twoWeeksAgoData3]

    

    console.log(dataArr[2])
        

   
        for (let i = 0; i < dataArr.length; i++){
            if (dataArr[i] == 0){
                dataArr[i] = dataArr[i]+1
            }
            console.log(dataArr[i])
        }
        
        console.log(dataArr)

    let titles = {
        searchWord1:userWord1,
        searchWord2:userWord2,
        searchWord3:userWord3
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
    
    let dataObj = {
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

    console.log(userWord1,
        userWord2, 
        userWord3, 
        currentWeekData1,
         oneWeekAgoData1, 
         twoWeeksAgoData1, 
         currentWeekData2, 
         oneWeekAgoData2, 
         twoWeeksAgoData2, 
         currentWeekData3, 
         oneWeekAgoData3, 
         twoWeeksAgoData3)
        return (
            <div>
                <h1>Skickar data till dashboard</h1>

                {dataArr && 
                    <DashboardGraph data={dataObj}/>
                }

            </div>
        )
    }


export default (withFirebase(Dashboard));