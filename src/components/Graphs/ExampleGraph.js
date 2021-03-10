import React from 'react';
import styled from 'styled-components';


const HashtagsDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;

& h3 {
    padding: 10px;
}

& p {
    padding: 5px;
}
`

//Creating a class 
class ExampleGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };

    }

    componentDidMount() {
        fetch('tesla.json')
//These headers where found in the tutorial of how to targert local jsoan. However, they do not seem to be needed.
        // , {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // }
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ data: data })
                
            })
            .catch(err => {
                console.log('Something went wrong', err)
            });
    }

    render() {
        //Here all the relevant data is saved to variables to be used later
        const hasthag1 = this.state.data ? this.state.data.data.hashtags[0].hashtag.name : "Loading";
        const ht1Hits = this.state.data ? this.state.data.data.hashtags[0].hashtag.media_count : "Loading";
        const hasthag2 = this.state.data ? this.state.data.data.hashtags[1].hashtag.name : "Loading";
        const ht2Hits = this.state.data ? this.state.data.data.hashtags[1].hashtag.media_count : "Loading";
        const hasthag3 = this.state.data ? this.state.data.data.hashtags[2].hashtag.name : "Loading";
        const ht3Hits = this.state.data ? this.state.data.data.hashtags[2].hashtag.media_count : "Loading";

        return (
            <HashtagsDiv>
                <h3>Here are the top three hastags on instagram that includes the word "tesla"</h3>
                <p>"{hasthag1}" with {ht1Hits} total uses</p>
                <p>"{hasthag2}" with {ht2Hits} total uses</p>
                <p>"{hasthag3}" with {ht3Hits} total uses</p>

            </HashtagsDiv>


        );
    }
}

export default ExampleGraph;