import React, { Component } from 'react';
import styled from 'styled-components';

const url = "http://api.openweathermap.org/data/2.5/weather?q=södertälje&APPID=f8384513fad5f91ea04d07a2cbf916ec&units=metric";

const PartOneIconUrl = "http://openweathermap.org/img/wn/";
const PartTwoIconUrl = "@2x.png"

const capitalize = (s) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}


const StyledIcon = styled.img`
width: 50px;
`

const WeatherContainer = styled.div`
display: flex;
flex-direction: column;
width: 250px;
height: 120px;
padding: 10px;
margin: 10px;
background: #6d7478;
border-radius: 10px;

& h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-family: 'Open-sans', sans-serif;
    letter-spacing: 1px;
    padding-bottom: 0px;
}

& h3 {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    letter-spacing: 0.5px;
}
`

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };

    }


    componentDidMount() {

        fetch("../../public/tesla.json")
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }


    render() {
        console.log(this.state.data)


        return (
            <WeatherContainer>

                <h1>Hej</h1>
            </WeatherContainer>
        )
    }

}

export default Weather;