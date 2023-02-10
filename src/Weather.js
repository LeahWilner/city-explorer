import React from 'react';
import { Card, CardHeader, CardTitle } from 'react-bootstrap';
// import CardHeader from 'react-bootstrap/esm/CardHeader';


class Weather extends React.Component {
    render() {
        console.log(this.props.weather);
        return (
            <>
            <h2>Weather</h2>
            {this.props.weather.map((weatherForecast, index) => {
                return(
                    <>
                    <Card key={index}>
                        <Card.Header>{weatherForecast.time}</Card.Header>
                        <Card.Body>
                            <Card.Title>{weatherForecast.forecast}</Card.Title>
                        </Card.Body>
                        </Card>
                        </>
                );
            })}
            
            </>
        );
    }
}

export default Weather;