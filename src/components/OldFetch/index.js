//This was the oldest and first version of how we fetched data


// class HomeSearch extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: null,
//             keywordInput: "",
//             fromDateInput: "",
//             toDateInput: "",
//             showResults: false,

//         };

//         this.handleClick = this.handleClick.bind(this);
//         this.handleKeywordChange = this.handleKeywordChange.bind(this);
//         this.handleFromDateChange = this.handleFromDateChange.bind(this);
//         this.handleToDateChange = this.handleToDateChange.bind(this);
//     }

//     handleKeywordChange(event) {
//         this.setState({ keywordInput: event.target.value})
//         console.log(this.state.keywordInput)
//         this.setState({ showResults: false })
//         this.setState({ data: null })
//     }

//     handleFromDateChange(event) {
//         this.setState({ fromDateInput: event.target.value})
//         console.log(event.target.value)
//     }

//     handleToDateChange(event) {
//         this.setState({ toDateInput: event.target.value})
//         console.log(event.target.value)
//     }
    

//     handleClick() {

//         let fromDate = ""
//         let toDate = ""

//         if(this.state.keywordInput === "") {
//             return
//         }

//         if(this.state.fromDateInput === "") {
//             fromDate = ""
//         } else {
//             fromDate = "&from=" + this.state.fromDateInput + "T00:00:01Z"
//         }

//         if(this.state.toDateInput === "") {
//             toDate = ""
//         } else {
//             toDate = "&to=" + this.state.toDateInput + "T00:00:01Z"
//         }


//         const url = "https://gnews.io/api/v4/search?"
//         const keyword = 'q=' + this.state.keywordInput
//         const key = '&token=8bd8954322ec49530ab22e22c8a3b84f'
//         const fullUrl = url + keyword + fromDate + toDate + key;

//         fetch(fullUrl)
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 this.setState({ data: data })
//                 console.log(data);
//                 console.log(fullUrl)
//             })
//         this.setState({ showResults: true })
//     }

//     render() {

//         let fromDate = "";
//         let toDate = "";

//         if (this.state.fromDateInput === "") {
//             fromDate = "";
//         } else {
//             fromDate = "after " + this.state.fromDateInput;
//         }

//         if (this.state.toDateInput === "") {
//             toDate = "";
//         } else {
//             toDate = "before " + this.state.toDateInput;
//         }

//         const keyword = this.state.keywordInput
//         const totalResult = this.state.data ? this.state.data.totalArticles : "Loading"

//         return(
//             <div>
//                 <h3>Search for any keyword and get a total result of articles!</h3>
                
//                 <input type="text" placeholder="Keyword" onChange={this.handleKeywordChange}></input>

//                 <br/>
//                 <label htmlFor="fromDate">Start date</label>
//                 <br />
//                 <input type="date" name="fromDate" placeholder="From" onChange={this.handleFromDateChange}></input>
               
//                 <br/>
//                 <label htmlFor="toDate">End date</label>
//                 <br />
//                 <input type="date" name="toDate" placeholder="To" onChange={this.handleToDateChange}></input>


//                 <button onClick={this.handleClick}>Search</button>

//                 {this.state.showResults && 
//                     <p>You have searched for {keyword}.
//                     <br/>
//                     Total results: {totalResult} 
//                     <br/>
//                     {fromDate} {toDate}
//                     </p>
//                 }  
                
//             </div>
//         )
//     }
// }

// export default HomeSearch;