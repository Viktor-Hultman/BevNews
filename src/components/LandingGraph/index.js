import React, { useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

import { Bar } from 'react-chartjs-2';
import { GraphDiv } from '../Graphs'


const LandingGraph= ({ firebase }) => {
    const [W9Apple, setW9Apple] = useState(null)
    const [W9Tesla, setW9Tesla] = useState(null)
    const [W8Apple, setW8Apple] = useState(null)
    const [W8Tesla, setW8Tesla] = useState(null)
    const [W7Apple, setW7Apple] = useState(null)
    const [W7Tesla, setW7Tesla] = useState(null)

    useEffect(() => {
        
        // console.log(user)
        fetch("appleData/03-01To03-08.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setW9Apple(data)
            })

        fetch("teslaData/03-01To03-08.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setW9Tesla(data)
            })


        fetch("appleData/02-22To03-01.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setW8Apple(data)
            })

        fetch("teslaData/02-22To03-01.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setW8Tesla(data)
            })


        fetch("appleData/02-15To02-22.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setW7Apple(data)
            })

        fetch("teslaData/02-15To02-22.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setW7Tesla(data)

            })
    }, [])

    const Week9 = W9Apple ? W9Apple.date : "Loading";
    const resultAppleW9 = W9Apple ? W9Apple.totalArticles : "Loading";
    const resultTeslaW9 = W9Tesla ? W9Tesla.totalArticles : "Loading";

    const Week8 = W8Apple ? W8Apple.date : "Loading";
    const resultAppleW8 = W8Apple ? W8Apple.totalArticles : "Loading";
    const resultTeslaW8 = W8Tesla ? W8Tesla.totalArticles : "Loading";

    const Week7 = W7Apple ? W7Apple.date : "Loading";
    const resultAppleW7 = W7Apple ? W7Apple.totalArticles : "Loading";
    const resultTeslaW7 = W7Tesla ? W7Tesla.totalArticles : "Loading";

    let titels = {
        Apple: "Apple",
        Tesla: "Tesla"
    }

    let Week7Props = {
        Week7: Week7,
        resultAppleW7: resultAppleW7,
        resultTeslaW7: resultTeslaW7

    }

    let Week8Props = {
        Week8: Week8,
        resultAppleW8: resultAppleW8,
        resultTeslaW8: resultTeslaW8

    }

    let Week9Props = {
        Week9: Week9,
        resultAppleW9: resultAppleW9,
        resultTeslaW9: resultTeslaW9

    }

    let props = {
        titels,
        Week7Props,
        Week8Props,
        Week9Props
    }

    return (
        <div>
            <SearchGraph data={props} />
        </div>
    )
}


const SearchGraph = (props) => {

    const data = {
        //Labels indecate the different values below each "section" of bars
        labels: [
            props.data.Week7Props.Week7,
            props.data.Week8Props.Week8,
            props.data.Week9Props.Week9,
        ],
        datasets: [
            {   //This label indecate what "dataset" or what the bars are refering to
                // In this example, all Apple data goes in this data set
                label: props.data.titels.Apple,
                data: [
                    props.data.Week7Props.resultAppleW7,
                    props.data.Week8Props.resultAppleW8,
                    props.data.Week9Props.resultAppleW9
                ],
                fill: false,
                borderColor: 'red',
                //Sets the color of each Apple bar
                backgroundColor: 'red',
                hoverBackgroundColor: 'darkred'

            },

            //When using several datasets to group bars, the syntax changes a little so that 
            // all information about each data set are grouped togheter

            {   //This label indecate what "dataset" or what the bars are refering to
                // In this example, all Tesla data goes in this data set
                label: props.data.titels.Tesla,
                data: [
                    props.data.Week7Props.resultTeslaW7,
                    props.data.Week8Props.resultTeslaW8,
                    props.data.Week9Props.resultTeslaW9
                ],
                fill: false,
                borderColor: 'blue',
                //Sets the color of each Tesla bar
                backgroundColor: 'blue',
                hoverBackgroundColor: 'darkblue'
            }
        ]
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
            <h3>A comparison between {props.data.titels.Apple} and {props.data.titels.Tesla} between week 7, 8 and 9.</h3>
            <Bar options={options} data={data} />
        </GraphDiv>
    );
};





export default withFirebase(LandingGraph);