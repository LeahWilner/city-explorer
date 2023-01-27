import React from "react";
import axios from "axios";
import "./App.css";

let API_KEY = process.env.REACT_APP_LOCATION_KEY;
console.log("🚀 ~ file: App.js:6 ~ API_KEY", API_KEY);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      error: false,
      errorMessage: "",
      lat: "",
      lon: "",
    };
  }

  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let city = await axios.get("https://us1.locationiq.com/v1/search.php");
  //     this.setState({
  //       city: city.data.results,
  //       error: false,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       errorMessage: `An errpr has occurred: ${error.response.status}`,
  //     });
  //   }
  // };
  handleCityInput = (event) => {
    console.log("🚀 ", event.target.value)

    this.setState({
      city: event.target.value,
    });

  };

  searchCityAPI = async (event) => {
    event.preventDefault();
    try { 
      let citySearchURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;

      let cityData = await axios.get(citySearchURL);
      console.log("🚀 ~ file: App.js:46 ~ App ~ searchCityAPI= ~ cityData", cityData)

      this.setState({
        error: false,
        displayMap: true,
        cityData: cityData.data[0],
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
      },
      // () => {
      //   this.getMapData();
      // }
      );
    } catch (error) {
      this.setState({
        displayMap: false,
        displayError: true,
        errorMessage: error.response.status + ': ' + error.response.data.error
      });
    }
  };

  submitCityHandler = async (event) => {
    event.preventDefault();


  //   try {
  //     let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.city.state}&format=json`;

  //     let cityInfo = await axios.get(url);

  //     this.setState({
  //       cityData: cityInfo.data[0],
  //       error: false,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error: true,
  //       errorMessage: `An error has occurred: ${error.response.status}`,
  //     });
  //   }

  
  // }  
};
  

  render() {
    // let city = this.state.city.map((name, index) => {
    //   return <li key={index}>{city.name}</li>;
    // });
console.log(this.state.lat);
    return (
      <>
        <form onSubmit={this.searchCityAPI}>
          <label>
            <input 
            type="text"
            onInput={this.handleCityInput}
            plcaeholder="Enter a City"
            />
          </label>
          <button type="submit">Explore!</button>
        </form>
        {this.state.lat}
        {this.state.lon}
      </>
    );
  }
}

export default App;
