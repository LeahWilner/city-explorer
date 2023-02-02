import React from "react";
import axios from "axios";
import "./App.css";

// let API_KEY = process.env.REACT_APP_LOCATION_KEY;
// console.log("🚀 ~ file: App.js:6 ~ API_KEY", API_KEY);
let SERVER = process.env.REACT_APP_SERVER;
// console.log(SERVER);

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
      mapData: "",
      weatherRequest: [],
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
    // console.log("🚀 ", event.target.value);

    this.setState({
      city: event.target.value,
    });
  };

  searchCityAPI = async (event) => {
    event.preventDefault();
    try {
      let citySearchURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;

      let cityData = await axios.get(citySearchURL);
      console.log(
        "🚀 ~ file: App.js:46 ~ App ~ searchCityAPI= ~ cityData",
        cityData
      );

      this.setState(
        {
          error: false,
          displayMap: true,
          cityData: cityData.data[0],
          lat: cityData.data[0].lat,
          lon: cityData.data[0].lon,
        },
        () => {
          this.getMapData();
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  getWeather = async () => {
    let weatherRequest = `${SERVER}/weather?searchquery=${this.state.city}&lat=${this.state.lat}&lon=${this.state.lon}`;
    let forecastData = await axios.get(weatherRequest);
    console.log(
      "🚀 ~ file: App.js:79 ~ App ~ getWeather= ~ forecastData",
      forecastData.data
    );

    console.log("yo");

    this.setState({
      weatherRequest: forecastData.data,
    });
  };

  // submitCityHandler = async (event) => {
  //   event.preventDefault();

  //   try {
  //     let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.city.state}&format=json`;
  //     console.log(this.city.state);

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
  //   console.log(this.state.lat);
  //   this.getMapData();
  // };

  getMapData = async () => {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.lat},${this.state.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;

    console.log("🚀 ~ file: App.js:97 ~ App ~ getMapData= ~ mapURL", mapURL);
    let mapDataResponse = await axios.get(mapURL);
    console.log(mapDataResponse);

    this.setState({
      mapData: mapDataResponse.config.url,
    });

    this.getWeather();
  };

  render() {
    // console.log(this.state.weatherRequest);
    let city = this.state.weatherRequest.map((forecast, index) => {
      return <li key={index}>{forecast.weatherForecast
      }: Date {forecast.datetime}</li>;
    });
    // console.log(this.state.lat);
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
        <main>
          {this.state.mapData && (
            <>
              {this.state.lat}
              {this.state.lon}
              <img src={this.state.mapData} alt={this.state.city} />

              <ul>{city}</ul>
            </>
          )}
        </main>
      </>
    );
  }
}

export default App;
