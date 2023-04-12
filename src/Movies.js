import React from "react";
// import { Card } from "react-bootstrap";

class Movies extends React.Component {
    render() {
    
        let movies = this.props.movies.map((movie, index) => {
            return <img key={index}src={movie.posterPath} alt={movie.title} />;
        });
        return <div>{movies}</div>;
        
    }
}

export default Movies;