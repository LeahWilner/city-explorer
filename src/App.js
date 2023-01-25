import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let city = await axios.get(
       "https://us1.locationiq.com/v1/search.php"
      )
    }
  }

}

render() {

}
 return (
  <>
  <form onSubmit={this.handleSubmit}>
    <button type="submit">Explore!</button>
  </form>
  
  
  </>

 )


export default App;
