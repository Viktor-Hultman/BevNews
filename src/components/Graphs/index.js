import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import { Doughnut, Line, Bar } from 'react-chartjs-2';

import styled from 'styled-components';

import { ChoosenWordsCard } from '../SearchWordForm'

import {PageTitle} from '../Account'

import { StyledButton } from '../SearchWordForm'

export const GraphButton = styled(StyledButton)`
background-color: ${props => props.theme.btnbg};
color: ${props => props.theme.txt};
margin: -10px 2px 0 2px;
border: 1px solid ${props => props.theme.btnbg};

:hover{
    border-color: ${props => props.theme.txt};
  }
`

export const GraphDiv = styled(ChoosenWordsCard)`
    height: 400px;
    width: 600px;
    margin: 20px;
    padding: 0 10px 35px 10px;
    @media(max-width: 320px){
        max-height: 250px;
        max-width: 250px;
    }    
    @media(min-width: 320px){
        max-height: 300px;
        max-width: 300px;
    }
    @media(min-width: 768px){
        max-height: 768px;
        max-width: 768px;
    }
    @media(min-width: 1024px){
        max-height: 1024px;
        max-width: 1024px;
    }   
`

const GraphsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`


const DashboardGraphs = ({firebase, uid, data, dataObjsArr}) => {
    if(dataObjsArr[0].response.results[0]){
        console.log(dataObjsArr[0].response.results[0].webTitle)
    }
    
    return(
        <GraphsContainer>
            <SummaryGraph firebase={firebase} uid={uid} data={data}/>
            <UserWord1Graph firebase={firebase} uid={uid} data={data}/>
            <UserWord2Graph firebase={firebase} uid={uid} data={data}/>
            {dataObjsArr[0].response.results[0] &&
                <HeadLineList firebase={firebase} uid={uid} data={data} dataObjsArr={dataObjsArr}/>
            }
        </GraphsContainer>
    )
}

const SummaryGraph = ( {firebase, uid, data} ) => {
    const [barGraph, setBarGraph] = useState(true)

    const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('graphSettings').child('summaryGraph')
            .set({ [value]: true})
    }

    const onClick = (evt) => {
        if(evt.target.value == "Bar"){
            setGraph("Bar")
            console.log("Bar")
        } else if (evt.target.value == "Line"){
            setGraph("Line")
            console.log("Line")
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('graphSettings').child('summaryGraph')
            .on('value', snapshot => {
                if (snapshot) {
                    const graphObject = snapshot.val();
                    if (graphObject) {
                        let graphArray = Object.keys(graphObject)
                        if(graphArray == "Bar") {
                            setBarGraph(true)
                        } else {
                            setBarGraph(false)
                        }
                    } else {
                        setBarGraph(true);
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);


    // console.log(data.searchWord1Data.currentWeekData1)
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
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'yellow',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'yellow',
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
        }]
    };
    const options = {
        "legend": {
            "labels": {
                "fontColor": "white",
                "fontSize": 15
            }
        },
        "maintainAspectRatio": false,
        "scales": {
          "yAxes": [
            {
              "gridLines": {
                "color": "white",
                "borderDash": [
                  0,
                  0
                ]
              },
              "ticks": {
                "beginAtZero": true,
                              "fontColor": 'white'
              }
            }
          ],
          "xAxes": [
            {
              "gridLines": {
                "color": "#fff",
                "borderDash": [
                  0,
                  0
                ]
              },
              "ticks": {
                "autoSkip": true,
                "autoSkipPadding": 40,
                "maxRotation": 0,
                "fontColor": 'white'
              }
            }
          ]
        },
        "layout": {
          "padding": 10,
        },
        "tooltips": {
          "enabled": true,
          "mode": "x",
          "intersect": true,
        }
      };
    return (
        <GraphDiv>
            

            {barGraph
            ? <Bar data={dataSetsData} options={options}/>
            : <Line data={dataSetsData} options={options}/>
            }
            
            
            <GraphButton value="Bar" onClick={onClick}>Bar Graph</GraphButton>
            <GraphButton value="Line" onClick={onClick}>Line Graph</GraphButton>
        </GraphDiv>
    )
}

const UserWord1Graph = ( {firebase, uid, data} ) => {
    const [barGraph, setBarGraph] = useState(true)

    const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('graphSettings').child('userWord1Graph')
            .set({ [value]: true})
    }

    const onClick = (evt) => {
        if(evt.target.value == "Bar"){
            setGraph("Bar")
            console.log("Bar")
        } else if (evt.target.value == "Line"){
            setGraph("Line")
            console.log("Line")
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('graphSettings').child('userWord1Graph')
            .on('value', snapshot => {
                if (snapshot) {
                    const graphObject = snapshot.val();
                    if (graphObject) {
                        let graphArray = Object.keys(graphObject)
                        if(graphArray == "Bar") {
                            setBarGraph(true)
                        } else {
                            setBarGraph(false)
                        }
                    } else {
                        setBarGraph(true);
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);


    // console.log(data.searchWord1Data.currentWeekData1)
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
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'yellow',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord1Data.twoWeeksAgoData1, data.searchWord1Data.oneWeekAgoData1, data.searchWord1Data.currentWeekData1]
        }]
    };
    const options = {
        "legend": {
            "labels": {
                "fontColor": "white",
                "fontSize": 15
            }
        },
        "maintainAspectRatio": false,
        "scales": {
          "yAxes": [
            {
              "gridLines": {
                "color": "white",
                "borderDash": [
                  0,
                  0
                ]
              },
              "ticks": {
                "beginAtZero": true,
                              "fontColor": 'white'
              }
            }
          ],
          "xAxes": [
            {
              "gridLines": {
                "color": "#fff",
                "borderDash": [
                  0,
                  0
                ]
              },
              "ticks": {
                "autoSkip": true,
                "autoSkipPadding": 40,
                "maxRotation": 0,
                "fontColor": 'white'
              }
            }
          ]
        },
        "layout": {
          "padding": 10,
        },
        "tooltips": {
          "enabled": true,
          "mode": "x",
          "intersect": true,
        }
      };
    return (
        <GraphDiv>
            
            {barGraph
            ? <Bar data={dataSetsData} options={options}/>
            : <Line data={dataSetsData} options={options}/>
            }
            
            
            <GraphButton value="Bar" onClick={onClick}>Bar Graph</GraphButton>
            <GraphButton value="Line" onClick={onClick}>Line Graph</GraphButton>
        </GraphDiv>
    )
}

const UserWord2Graph = ( {firebase, uid, data} ) => {
    const [barGraph, setBarGraph] = useState(true)

    const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('graphSettings').child('userWord2Graph')
            .set({ [value]: true})
    }

    const onClick = (evt) => {
        if(evt.target.value == "Bar"){
            setGraph("Bar")
            console.log("Bar")
        } else if (evt.target.value == "Line"){
            setGraph("Line")
            console.log("Line")
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.user(uid).child('settings').child('graphSettings').child('userWord2Graph')
            .on('value', snapshot => {
                if (snapshot) {
                    const graphObject = snapshot.val();
                    if (graphObject) {
                        let graphArray = Object.keys(graphObject)
                        if(graphArray == "Bar") {
                            setBarGraph(true)
                        } else {
                            setBarGraph(false)
                        }
                    } else {
                        setBarGraph(true);
                    }
                }
            });
        return () => {
            unsubscribe();
        }
      
    }, []);


    // console.log(data.searchWord1Data.currentWeekData1)
    const dataSetsData = {
        labels: [ 
            // props.dataObj.titles.searchWord1
            "Two weeks ago",
            "Last week",
            "This week"
        ],
        datasets: [
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
            pointHoverBorderColor: 'red',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord2Data.twoWeeksAgoData2, data.searchWord2Data.oneWeekAgoData2, data.searchWord2Data.currentWeekData2]
        }]
    };
    const options = {
        "legend": {
            "labels": {
                "fontColor": "white",
                "fontSize": 15
            }
        },
        "maintainAspectRatio": false,
        "scales": {
          "yAxes": [
            {
              "gridLines": {
                "color": "white",
                "borderDash": [
                  0,
                  0
                ]
              },
              "ticks": {
                "beginAtZero": true,
                              "fontColor": 'white'
              }
            }
          ],
          "xAxes": [
            {
              "gridLines": {
                "color": "#fff",
                "borderDash": [
                  0,
                  0
                ]
              },
              "ticks": {
                "autoSkip": true,
                "autoSkipPadding": 40,
                "maxRotation": 0,
                "fontColor": 'white'
              }
            }
          ]
        },
        "layout": {
          "padding": 10,
        },
        "tooltips": {
          "enabled": true,
          "mode": "x",
          "intersect": true,
        }
      };
    return (
        <GraphDiv>
            

            {barGraph
            ? <Bar data={dataSetsData} options={options}/>
            : <Line data={dataSetsData} options={options}/>
            }
            
            <GraphButton value="Bar" onClick={onClick}>Bar Graph</GraphButton>
            <GraphButton value="Line" onClick={onClick}>Line Graph</GraphButton>
        </GraphDiv>
    )
}

const HeadLineList = ( {firebase, uid, data, dataObjsArr} ) => {
    if(!dataObjsArr[0].response.results[0]){
        console.log("This text should never bee seen in the console")
    }
 
    console.log(dataObjsArr[1].response.results[0].webTitle)
    // const HeadLineArr = []
  
    return (

            <ChoosenWordsCard>
                <ul> 

                    {dataObjsArr.map((item) => {
                        return <li key={item.response.results[0].webUrl}><a href={item.response.results[0].webUrl}>{item.response.results[0].webTitle}</a></li>
                    })}
                </ul>
            </ChoosenWordsCard>
    
    )
  }

export default (withFirebase(DashboardGraphs));