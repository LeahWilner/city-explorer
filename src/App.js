import React from "react";
import axios from "axios";
import "./App.css";

let API_KEY = process.env.REACT_APP_LOCATION_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      error: false,
      errorMessage: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let city = await axios.get("https://us1.locationiq.com/v1/search.php");
      this.setState({
        city: city.data.results,
        error: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: `An errpr has occurred: ${error.response.status}`,
      });
    }
  };

  submitCityHandler = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.city.state}&format=json`;

      let cityInfo = await axios.get(url);

      this.setState({
        cityData: cityInfo.data[0],
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error has occurred: ${error.response.status}`,
      });
    }
  };

  render() {
    // let cityList = this.state.city.map((name, index) => {
    //   return <li key={index}>{city.name}</li>;
    // });

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Explore!</button>
        </form>
      </>
    );
  }
}

export default App;
