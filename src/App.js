import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsData: [], 
      searchResults: [],
      searchText: "",
    }
  }

componentDidMount() {
  this.fetchingStories();

}

fetchingStories () {
  fetch('http://hn.algolia.com/api/v1/search?query=foo&tags=story')
  .then((res) => { return res.json() })
  .then((res) => { console.log(res); this.setState( {newsData: res.hits})})
  .catch(error => console.log("Parsing failed", error));
}
search = () => {
  var topsearch = this.state.newsData.filter(item => item.author == this.state.searchText)
  this.setState({searchResults: topsearch})
}
  render () {
    console.log(this.state.searchText)
    return (
    <div className="App">
      <div>
        <input type = "text" onChange ={(e) => {
          this.setState({searchText: e.target.value})
        }}></input>
        <button onClick = {this.search}>search</button>
        {this.state.searchResults.map((item,index) => {
          console.log(item)
          return <div key={index}>{item.author}: {item.title}</div>
        })}
      </div>

    </div>
    );
  }
}

export default App;
