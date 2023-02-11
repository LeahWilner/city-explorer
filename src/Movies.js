import React from "react";

class Movies extends React.Component {
    render() {
        let movies = this.props.movies.map((movie, index) => {
            return <img src={movie.imageUrl} alt={movie.title} />;
        });
        return <div>{movies}</div>;
    }
}

export default Movies;