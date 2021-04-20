import React, { useState, useEffect } from 'react';

import { Doughnut, Line, Bar, Radar, Pie, Polar } from 'react-chartjs-2';
import styled from 'styled-components';

import { withFirebase } from '../Firebase';
import { ChoosenWordsCard } from '../SearchWordForm'
import { StyledButton } from '../SearchWordForm'


export const GraphButton = styled(StyledButton)`
background-color: ${props => props.theme.btnbg};
color: ${props => props.theme.txt};
margin: 0 2px 0 2px;
border: 1px solid ${props => props.theme.btnbg};

:hover{
    border-color: ${props => props.theme.txt};
  }
`

export const GraphDiv = styled(ChoosenWordsCard)`
    height: 400px;
    width: 600px;
    margin: 20px;
    padding: 10px 10px 50px 10px;
    @media(max-width: 350px){
        max-height: 250px;
        max-width: 250px;
        margin: 0 0 20px 0;
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

const HeadlineListCard = styled(ChoosenWordsCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 600px;
  margin: 20px;
  @media(max-width: 320px){
      max-width: 250px;
      margin: 0 0 20px 0;
  }    
  @media(min-width: 320px){
      max-width: 300px;
      margin: 0 0 20px 0;
  }
  @media(min-width: 768px){
      max-width: 768px;
  }
  @media(min-width: 1024px){
      max-width: 1024px;
  }  
`

const HeadlineList = styled.ul`
  list-style: none;
`

const HeadlineListItem = styled.li`
  padding: 5px;
`

const NewsLinks = styled.a`
    text-decoration: none;
    color:#fff;
    :hover{
      color: ${props => props.theme.btnbg};
      text-decoration: underline;
    }
`

const DashboardGraphs = ({firebase, uid, data, dataObjsArr, userWordsArr}) => {

    
    return(
      <>
          {userWordsArr[0] &&
            !userWordsArr[1] &&
              <GraphsContainer>
                  <SummaryGraph1Words firebase={firebase} uid={uid} data={data}/>
                  <SummaryGraphPolar1Words firebase={firebase} uid={uid} data={data}/>
                  <HeadLineList firebase={firebase} uid={uid} data={data} dataObjsArr={dataObjsArr}/>
              </GraphsContainer>
          }

          {userWordsArr[1] &&
            !userWordsArr[2] &&
              <GraphsContainer>
                  <SummaryGraph2Words firebase={firebase} uid={uid} data={data}/>
                  <UserWord1Graph firebase={firebase} uid={uid} data={data}/>
                  <UserWord2Graph firebase={firebase} uid={uid} data={data}/>
                  <SummaryGraphPie2Words firebase={firebase} uid={uid} data={data}/>
                  <SummaryGraphPolar2Words firebase={firebase} uid={uid} data={data}/>
                  <HeadLineList firebase={firebase} uid={uid} data={data} dataObjsArr={dataObjsArr}/>
              </GraphsContainer>
          }

          {userWordsArr[2] &&
              <GraphsContainer>
                  <SummaryGraph3Words firebase={firebase} uid={uid} data={data}/>
                  <UserWord1Graph firebase={firebase} uid={uid} data={data}/>
                  <UserWord2Graph firebase={firebase} uid={uid} data={data}/>
                  <UserWord3Graph firebase={firebase} uid={uid} data={data}/>
                  <SummaryGraphPie3Words firebase={firebase} uid={uid} data={data}/>
                  <SummaryGraphPolar3Words firebase={firebase} uid={uid} data={data}/>
                  <HeadLineList firebase={firebase} uid={uid} data={data} dataObjsArr={dataObjsArr}/>
              </GraphsContainer>
          }
      </>
    )
}

//Global options for Bar and Line charts
const optionsBarCharts = {
  "legend": {
      "labels": {
          "fontColor": "white",
          "fontSize": 15
      }
  },
  "maintainAspectRatio": false,
  "scales": {
    "yAxes": [
      {"gridLines": {
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

const SummaryGraph1Words = ( {firebase, uid, data} ) => {
  const [barGraph, setBarGraph] = useState(true)

  const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
      firebase.user(uid).child('settings').child('graphSettings').child('summaryGraph')
          .set({ [value]: true})
  }

  const onClick = (evt) => {
      if(evt.target.value == "Bar"){
          setGraph("Bar")
          
      } else if (evt.target.value == "Line"){
          setGraph("Line")
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

  const dataSetsData = {
      labels: [ 
          "Four weeks ago",
          "Three weeks ago",
          "Two weeks ago",
          "Last week",
          "This week"
      ],
      datasets: [
          {
          label: data.titles.searchWord1,
          fill: false,
          lineTension: 0.1,
          borderWidth: 5,
          backgroundColor: 'yellow',
          borderColor: 'yellow',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'yellow',
          pointBackgroundColor: 'yellow',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [data.searchWord1Data.fourWeeksAgoData1, data.searchWord1Data.threeWeeksAgoData1, data.searchWord1Data.twoWeeksAgoData1, data.searchWord1Data.oneWeekAgoData1, data.searchWord1Data.currentWeekData1]
      }]
  };
  
  return (
      <GraphDiv>
          {barGraph
          ? <Bar data={dataSetsData} options={optionsBarCharts}/>
          : <Line data={dataSetsData} options={optionsBarCharts}/>
          }
          <GraphButton value="Bar" onClick={onClick}>Bar Graph</GraphButton>
          <GraphButton value="Line" onClick={onClick}>Line Graph</GraphButton>
      </GraphDiv>
  )
}

const SummaryGraph2Words = ( {firebase, uid, data} ) => {
  const [barGraph, setBarGraph] = useState(true)

  const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
      firebase.user(uid).child('settings').child('graphSettings').child('summaryGraph')
          .set({ [value]: true})
  }

  const onClick = (evt) => {
      if(evt.target.value == "Bar"){
          setGraph("Bar")
          
      } else if (evt.target.value == "Line"){
          setGraph("Line")
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

  const dataSetsData = {
      labels: [ 
          "Four weeks ago",
          "Three weeks ago",
          "Two weeks ago",
          "Last week",
          "This week"
      ],
      datasets: [
          {
          label: data.titles.searchWord1,
          fill: false,
          lineTension: 0.1,
          borderWidth: 5,
          backgroundColor: 'yellow',
          borderColor: 'yellow',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'yellow',
          pointBackgroundColor: 'yellow',
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [data.searchWord1Data.fourWeeksAgoData1, data.searchWord1Data.threeWeeksAgoData1, data.searchWord1Data.twoWeeksAgoData1, data.searchWord1Data.oneWeekAgoData1, data.searchWord1Data.currentWeekData1]
      },
      {
          label: data.titles.searchWord2,
          fill: false,
          lineTension: 0.1,
          borderWidth: 5,
          backgroundColor: 'red',
          borderColor: 'red',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'red',
          pointBackgroundColor: 'red',
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'red',
          pointHoverBorderColor: 'darkred',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [data.searchWord2Data.fourWeeksAgoData2, data.searchWord2Data.threeWeeksAgoData2, data.searchWord2Data.twoWeeksAgoData2, data.searchWord2Data.oneWeekAgoData2, data.searchWord2Data.currentWeekData2]
      }]
  };

  return (
      <GraphDiv>
          {barGraph
          ? <Bar data={dataSetsData} options={optionsBarCharts}/>
          : <Line data={dataSetsData} options={optionsBarCharts}/>
          }
          <GraphButton value="Bar" onClick={onClick}>Bar Graph</GraphButton>
          <GraphButton value="Line" onClick={onClick}>Line Graph</GraphButton>
      </GraphDiv>
  )
}

const SummaryGraph3Words = ( {firebase, uid, data} ) => {
    const [barGraph, setBarGraph] = useState(true)

    const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
        firebase.user(uid).child('settings').child('graphSettings').child('summaryGraph')
            .set({ [value]: true})
    }

    const onClick = (evt) => {
        if(evt.target.value == "Bar"){
            setGraph("Bar")
            
        } else if (evt.target.value == "Line"){
            setGraph("Line")
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

    const dataSetsData = {
        labels: [ 
            "Four weeks ago",
            "Three weeks ago",
            "Two weeks ago",
            "Last week",
            "This week"
        ],
        datasets: [
            {
            label: data.titles.searchWord1,
            fill: false,
            lineTension: 0.1,
            borderWidth: 5,
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'yellow',
            pointBackgroundColor: 'yellow',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord1Data.fourWeeksAgoData1, data.searchWord1Data.threeWeeksAgoData1, data.searchWord1Data.twoWeeksAgoData1, data.searchWord1Data.oneWeekAgoData1, data.searchWord1Data.currentWeekData1]
        },
        {
            label: data.titles.searchWord2,
            fill: false,
            lineTension: 0.1,
            borderWidth: 5,
            backgroundColor: 'red',
            borderColor: 'red',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'red',
            pointBackgroundColor: 'red',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'red',
            pointHoverBorderColor: 'darkred',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord2Data.fourWeeksAgoData2, data.searchWord2Data.threeWeeksAgoData2, data.searchWord2Data.twoWeeksAgoData2, data.searchWord2Data.oneWeekAgoData2, data.searchWord2Data.currentWeekData2]
        },
        {
            label: data.titles.searchWord3,
            fill: false,
            lineTension: 0.1,
            borderWidth: 5,
            backgroundColor: 'green',
            borderColor: 'green',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'green',
            pointBackgroundColor: 'green',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'green',
            pointHoverBorderColor: 'darkgreen',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord3Data.fourWeeksAgoData3, data.searchWord3Data.threeWeeksAgoData3, data.searchWord3Data.twoWeeksAgoData3, data.searchWord3Data.oneWeekAgoData3, data.searchWord3Data.currentWeekData3]
        }]
    };

    return (
        <GraphDiv>
            {barGraph
            ? <Bar data={dataSetsData} options={optionsBarCharts}/>
            : <Line data={dataSetsData} options={optionsBarCharts}/>
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
            
        } else if (evt.target.value == "Line"){
            setGraph("Line")
           
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

    const dataSetsData = {
        labels: [ 
            "Four weeks ago",
            "Three weeks ago",
            "Two weeks ago",
            "Last week",
            "This week"
        ],
        datasets: [
            {
            label: data.titles.searchWord1,
            fill: false,
            lineTension: 0.1,
            borderWidth: 5,
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'yellow',
            pointBackgroundColor: 'yellow',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord1Data.fourWeeksAgoData1, data.searchWord1Data.threeWeeksAgoData1, data.searchWord1Data.twoWeeksAgoData1, data.searchWord1Data.oneWeekAgoData1, data.searchWord1Data.currentWeekData1]
        }]
    };

    return (
        <GraphDiv>
            
            {barGraph
            ? <Bar data={dataSetsData} options={optionsBarCharts}/>
            : <Line data={dataSetsData} options={optionsBarCharts}/>
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
            
        } else if (evt.target.value == "Line"){
            setGraph("Line")
            
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

    const dataSetsData = {
        labels: [ 
            "Four weeks ago",
            "Three weeks ago",
            "Two weeks ago",
            "Last week",
            "This week"
        ],
        datasets: [
            {
            label: data.titles.searchWord2,
            fill: false,
            lineTension: 0.1,
            borderWidth: 5,
            backgroundColor: 'red',
            borderColor: 'red',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'red',
            pointBackgroundColor: 'red',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'red',
            pointHoverBorderColor: 'red',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [data.searchWord2Data.fourWeeksAgoData2, data.searchWord2Data.threeWeeksAgoData2, data.searchWord2Data.twoWeeksAgoData2, data.searchWord2Data.oneWeekAgoData2, data.searchWord2Data.currentWeekData2]
        }]
    };

    return (
        <GraphDiv>
            {barGraph
            ? <Bar data={dataSetsData} options={optionsBarCharts}/>
            : <Line data={dataSetsData} options={optionsBarCharts}/>
            }
            <GraphButton value="Bar" onClick={onClick}>Bar Graph</GraphButton>
            <GraphButton value="Line" onClick={onClick}>Line Graph</GraphButton>
        </GraphDiv>
    )
};

const UserWord3Graph = ( {firebase, uid, data} ) => {
  const [barGraph, setBarGraph] = useState(true)

  const setGraph = (value) => { // ['Tesla' , "Apple", "Saab"]
      firebase.user(uid).child('settings').child('graphSettings').child('userWord3Graph')
          .set({ [value]: true})
  }

  const onClick = (evt) => {
      if(evt.target.value == "Bar"){
          setGraph("Bar")
          
      } else if (evt.target.value == "Line"){
          setGraph("Line")  
      }
  }

  useEffect(() => {
      const unsubscribe = firebase.user(uid).child('settings').child('graphSettings').child('userWord3Graph')
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

  const dataSetsData = {
      labels: [ 
          "Four weeks ago",
          "Three weeks ago",
          "Two weeks ago",
          "Last week",
          "This week"
      ],
      datasets: [
          {
          label: data.titles.searchWord3,
          fill: false,
          lineTension: 0.1,
          borderWidth: 5,
          backgroundColor: 'green',
          borderColor: 'green',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'green',
          pointBackgroundColor: 'green',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'green',
          pointHoverBorderColor: 'green',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [data.searchWord3Data.fourWeeksAgoData3, data.searchWord3Data.threeWeeksAgoData3, data.searchWord3Data.twoWeeksAgoData3, data.searchWord3Data.oneWeekAgoData3, data.searchWord3Data.currentWeekData3]
      }]
  };

  return (
      <GraphDiv>
          

          {barGraph
          ? <Bar data={dataSetsData} options={optionsBarCharts}/>
          : <Line data={dataSetsData} options={optionsBarCharts}/>
          }
          
          <GraphButton value="Bar" onClick={onClick}>Bar Graph</GraphButton>
          <GraphButton value="Line" onClick={onClick}>Line Graph</GraphButton>
      </GraphDiv>
  )
};

//Global Pie chart options
const optionsPieChart = {
  "legend": {
      "labels": {
          "fontColor": "white",
          "fontSize": 15
      }
  },
  "maintainAspectRatio": false,
};


const SummaryGraphPie2Words = ( {firebase, uid, data} ) => {
  const searchWord1 = data.searchWord1Data.fourWeeksAgoData1 + data.searchWord1Data.threeWeeksAgoData1 + data.searchWord1Data.twoWeeksAgoData1 + data.searchWord1Data.oneWeekAgoData1 + data.searchWord1Data.currentWeekData1;
  const searchWord2 = data.searchWord2Data.fourWeeksAgoData2 + data.searchWord2Data.threeWeeksAgoData2 + data.searchWord2Data.twoWeeksAgoData2 + data.searchWord2Data.oneWeekAgoData2 + data.searchWord2Data.currentWeekData2;

  const TotalProcent = searchWord1 + searchWord2
  
  //Remaking the numbers of total results from each word and converting them to the procentage of the total number
  let searchWord1Procent = Math.round(searchWord1/TotalProcent * 100);
  let searchWord2Procent = Math.round(searchWord2/TotalProcent * 100);
 

  const dataSetsData = {
    labels: [ 
        data.titles.searchWord1,
        data.titles.searchWord2,

    ],
    datasets: [
        {
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,
        data: [searchWord1Procent, searchWord2Procent]
        }
    ]
    };
    

    return (
      <GraphDiv>
        <h3>Here is the total procentage of your words compared to each other</h3>
        <Pie data={dataSetsData} options={optionsPieChart}/>
      </GraphDiv>
  )
};


const SummaryGraphPie3Words = ( {firebase, uid, data} ) => {
  const searchWord1 = data.searchWord1Data.fourWeeksAgoData1 + data.searchWord1Data.threeWeeksAgoData1 + data.searchWord1Data.twoWeeksAgoData1 + data.searchWord1Data.oneWeekAgoData1 + data.searchWord1Data.currentWeekData1;
  const searchWord2 = data.searchWord2Data.fourWeeksAgoData2 + data.searchWord2Data.threeWeeksAgoData2 + data.searchWord2Data.twoWeeksAgoData2 + data.searchWord2Data.oneWeekAgoData2 + data.searchWord2Data.currentWeekData2;
  const searchWord3 = data.searchWord3Data.fourWeeksAgoData3 + data.searchWord3Data.threeWeeksAgoData3 + data.searchWord3Data.twoWeeksAgoData3 + data.searchWord3Data.oneWeekAgoData3 + data.searchWord3Data.currentWeekData3;
  const TotalProcent = searchWord1 + searchWord2 + searchWord3
  
  //Remaking the numbers of total results from each word and converting them to the procentage of the total number
  let searchWord1Procent = Math.round(searchWord1/TotalProcent * 100);
  let searchWord2Procent = Math.round(searchWord2/TotalProcent * 100);
  let searchWord3Procent = Math.round(searchWord3/TotalProcent * 100);

  const dataSetsData = {
    labels: [ 
        data.titles.searchWord1,
        data.titles.searchWord2,
        data.titles.searchWord3,  
    ],
    datasets: [
        {
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,
        data: [searchWord1Procent, searchWord2Procent, searchWord3Procent]
        }
    ]
    };
    

    return (
      <GraphDiv>
        <h3>Here is the total procentage of your words compared to each other</h3>
        <Pie data={dataSetsData} options={optionsPieChart}/>
      </GraphDiv>
  )
};

//Global Polar chart options
const optionsPolarChart = {
  "legend": {
      "labels": {
          "fontColor": "white",
          "fontSize": 15
      }
  },
  "maintainAspectRatio": false,
//"scale" instead of "scales" when changing the options of the gridlines of radial charts 
  "scale": {
    "gridLines": {
      "color": "white",
      "borderDash": [
        0,
        0
      ] 
    }
  } 
};

const SummaryGraphPolar1Words = ( {data} ) => {
  const searchWord1 = data.searchWord1Data.fourWeeksAgoData1 + data.searchWord1Data.threeWeeksAgoData1 + data.searchWord1Data.twoWeeksAgoData1 + data.searchWord1Data.oneWeekAgoData1 + data.searchWord1Data.currentWeekData1;

  const dataSetsData = {
    labels: [ 
        data.titles.searchWord1,
    ],
    datasets: [
        {
        borderWidth: 0,
        backgroundColor: [
          'rgb(255, 99, 132, 0.6)',
          'rgb(54, 162, 235, 0.6)',
          'rgb(255, 205, 86, 0.6)'
        ],
        
        hoverOffset: 4,
        data: [searchWord1]
        }
    ]
    };

    return (
      <GraphDiv>
        <Polar data={dataSetsData} options={optionsPolarChart}/>
      </GraphDiv>
  )
};


const SummaryGraphPolar2Words = ( {data} ) => {
  const searchWord1 = data.searchWord1Data.fourWeeksAgoData1 + data.searchWord1Data.threeWeeksAgoData1 + data.searchWord1Data.twoWeeksAgoData1 + data.searchWord1Data.oneWeekAgoData1 + data.searchWord1Data.currentWeekData1;
  const searchWord2 = data.searchWord2Data.fourWeeksAgoData2 + data.searchWord2Data.threeWeeksAgoData2 + data.searchWord2Data.twoWeeksAgoData2 + data.searchWord2Data.oneWeekAgoData2 + data.searchWord2Data.currentWeekData2;

  const dataSetsData = {
    labels: [ 
  
        data.titles.searchWord1,
        data.titles.searchWord2,
    ],
    datasets: [
        {
        borderWidth: 0,
        backgroundColor: [
          'rgb(255, 99, 132, 0.6)',
          'rgb(54, 162, 235, 0.6)',
          'rgb(255, 205, 86, 0.6)'
        ],
        
        hoverOffset: 4,
        data: [searchWord1, searchWord2]
        }
    ]
    };

    return (
      <GraphDiv>
        <Polar data={dataSetsData} options={optionsPolarChart}/>
      </GraphDiv>
  )
};


const SummaryGraphPolar3Words = ( {data} ) => {
  const searchWord1 = data.searchWord1Data.fourWeeksAgoData1 + data.searchWord1Data.threeWeeksAgoData1 + data.searchWord1Data.twoWeeksAgoData1 + data.searchWord1Data.oneWeekAgoData1 + data.searchWord1Data.currentWeekData1;
  const searchWord2 = data.searchWord2Data.fourWeeksAgoData2 + data.searchWord2Data.threeWeeksAgoData2 + data.searchWord2Data.twoWeeksAgoData2 + data.searchWord2Data.oneWeekAgoData2 + data.searchWord2Data.currentWeekData2;
  const searchWord3 = data.searchWord3Data.fourWeeksAgoData3 + data.searchWord3Data.threeWeeksAgoData3 + data.searchWord3Data.twoWeeksAgoData3 + data.searchWord3Data.oneWeekAgoData3 + data.searchWord3Data.currentWeekData3;
  const dataSetsData = {
    labels: [ 
        // props.dataObj.titles.searchWord1
        data.titles.searchWord1,
        data.titles.searchWord2,
        data.titles.searchWord3,
    ],
    datasets: [
        {
        borderWidth: 0,
        backgroundColor: [
          'rgb(255, 99, 132, 0.6)',
          'rgb(54, 162, 235, 0.6)',
          'rgb(255, 205, 86, 0.6)'
        ],
        
        hoverOffset: 4,
        data: [searchWord1, searchWord2, searchWord3]
        }
    ]
    };

    return (
      <GraphDiv>
        <Polar data={dataSetsData} options={optionsPolarChart}/>
      </GraphDiv>
  )
};


const HeadLineList = ( {firebase, uid, data, dataObjsArr} ) => {
    if(!dataObjsArr[0].response.results[0]){
        console.log("This text should never bee seen in the console")
    }

    //Foor loop that goes through the first result of each word and checks if there are any results
    let dataObjArrFiltered = []
    for(let i = 0; i < dataObjsArr.length; i++){
      //If there is a result (weburl for an article) then the result will get pushed into the empty array above
        if(dataObjsArr[i].response.results[0] !== undefined){
            dataObjArrFiltered.push(dataObjsArr[i])
        }
    }
    
    return (

            <HeadlineListCard>
                <h2>Top headlines</h2>
                <HeadlineList> 
                    {/* Map funtion on the filtered object array to create a list of weburls*/}
                    {dataObjArrFiltered.map((item) => {
                        return <HeadlineListItem key={Math.random()}><NewsLinks href={item.response.results[0].webUrl} target="_blank">{item.response.results[0].webTitle}</NewsLinks></HeadlineListItem>
                    })}

                </HeadlineList>
            </HeadlineListCard>
    
    )
};

export default (withFirebase(DashboardGraphs));