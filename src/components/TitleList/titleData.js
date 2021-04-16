import React, { useContext, useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';

import { Doughnut, Line, Bar } from 'react-chartjs-2';

import styled from 'styled-components';



const TitleList = ( {firebase, uid, data} ) => {
    const [barGraph, setBarGraph] = useState(true)

    const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('graphSettings')
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
        const unsubscribe = firebase.user(uid).child('settings').child('graphSettings')
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
        "maintainAspectRatio": true,
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
            
            
            <button value="Bar" onClick={onClick}>Bar Graph</button>
            <button value="Line" onClick={onClick}>Line Graph</button>
        </GraphDiv>
    )
}
