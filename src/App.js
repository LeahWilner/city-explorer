import React from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Weather.js';
import Movies from './Movies';


// let API_KEY = process.env.REACT_APP_LOCATION_KEY;
// console.log("🚀 ~ file: App.js:6 ~ API_KEY", API_KEY);
// let SERVER = process.env.REACT_APP_SERVER;


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
      movies: [],
    };
  }


  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  searchCityAPI = async (event) => {
    event.preventDefault();
    try {
      let citySearchURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;

      let cityData = await axios.get(citySearchURL);
   
      // console.log(
        // "🚀 ~ file: App.js:46 ~ App ~ searchCityAPI= ~ cityData",
        // cityData
      // );

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
      this.getWeatherData(cityData.data[0].lat, cityData.data[0].lon);
      this.getMoviesData();

    } catch (error) {
      console.error(error);
    }

  };

  

 
  getMapData = async () => {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.lat},${this.state.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;

    // console.log("🚀 ~ file: App.js:97 ~ App ~ getMapData= ~ mapURL", mapURL);
    let mapDataResponse = await axios.get(mapURL);
    // console.log(mapDataResponse);

    this.setState({
      mapData: mapDataResponse.config.url,
    });

  };

getWeatherData = async (lat, lon) => {
  // console.log('!!!!!!!!1',lat, lon);
  try{
    let serverURL = `${process.env.REACT_APP_SERVER}/newweather?lat=${lat}&lon=${lon}`;
    
    // console.log("🚀 ~ file: App.js:88 ~ App ~ getWeatherData= ~ serverURL", serverURL);
    let weatherResults = await axios.get(serverURL);
    console.log("🚀 ~ file: App.js:90 ~ App ~ getWeatherData= ~ weatherResults", weatherResults);
    
    this.setState({
      weatherRequest: weatherResults.data
    })
  } catch (error) {
    this.setState({
      displayMap: false,
      displayError: true,
      errorMessage: error.response && error.response.status
    });
  }
};

getMoviesData = async () => {
  try{
    let serverURL = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`;
    let movieResults = await axios.get(serverURL);
    this.setState({
      movies: movieResults.data,
    });
    console.log(movieResults.data);
  } catch (error) {
    this.setState({
      displayMap: false,
      displayError: true,
      errorMessage: error.response && error.reponse.status,
    });
  }
};

// getYelpData = async () => {
//   try {
//     let serverURL = `${}`
//   } catch (error) {
    
//   }
//      // await axios(url, 
//       //   method: 'get',
//       //   {
//       //     headers: Bearer API_KEY,
//       //   })
// }


  render() {
    // console.log(this.state.weatherRequest);
    // let city = this.state.weatherRequest.map((forecast, index) => {
    //   return <li key={index}>{forecast.weatherForecast
    //   }: Date {forecast.datetime}</li>;
    // });
    // console.log(this.state.lat);
    return (
      <>
      <h1>City Explorer</h1>
        <form onSubmit={this.searchCityAPI}>
          <label>
            <input
              type="text"
              onInput={this.handleCityInput}
              placeholder="Enter a City"
            />
          </label>
          <button type="submit">Explore!</button>
        </form>
        <main>
          {this.state.mapData && (
            <>
            <ul>
              <li>City: {this.state.cityData.display_name}</li>
              <li>Latitude: {this.state.lat}</li>
              <li>Longitude: {this.state.lon}</li>
              <img src={this.state.mapData} alt={this.state.city} />

              </ul>
              <Weather weather={this.state.weatherRequest}/>
              <Movies movies={this.state.movies}/>
            </>
          )}
        </main>
      </>
    );
  }
}

export default App;
