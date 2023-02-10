import React from 'react';


class Weather extends React.Component {
    render() {
        console.log(this.props.weather);
        return (
            <>
            <h2>Weather</h2>
            {/* {this.props.weather.map((weatherForecast, index) => {
                return(
                    <></>
                );
            })} */}
            
            </>
        );
    }
}

export default Weather;