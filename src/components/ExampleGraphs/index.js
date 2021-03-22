import React from 'react';
import styled from 'styled-components';

// const localUrl = "./"

// const localJSON = ".json"

class ExampleGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };

    }

    componentDidMount() {
    // let keyword = document.querySelector("#keyword").value;
    // let searchUrl = localUrl + keyword + localJSON;

    fetch("../JsonData.tesla.json")
    //     , 
    //     {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": "86663d2e5dmsh3e81e1931493771p1b5251jsn0d9ebb5bcb75",
    //         "x-rapidapi-host": "instagram39.p.rapidapi.com"
    //     }
    // })
        .then((response) => {
            return response.json()
        })
        .then(json => {
            this.setState({ data: json })
            // hashtag1.innerHTML = data.data.hashtags[0].hashtag.name
            // ht1Hits.innerHTML = data.data.hashtags[0].hashtag.media_count
            // hashtag2.innerHTML = data.data.hashtags[1].hashtag.name
            // ht2Hits.innerHTML = data.data.hashtags[1].hashtag.media_count
            // hashtag3.innerHTML = data.data.hashtags[2].hashtag.name
            // ht3Hits.innerHTML = data.data.hashtags[2].hashtag.media_count
            // hits.innerHTML = data.response.total;
        })
        .catch(err => {
            console.log('Something went wrong', err)
        })
    }
    render() {
        return (
            console.log(this.state.data)
        )
    }
    
}

export default ExampleGraph;