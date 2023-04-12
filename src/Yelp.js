import React from "react";
// import { Card } from "react-bootstrap";

class Yelp extends React.Component {
    render() {
    
        let yelp = this.props.yelp.map((yelp, index) => (
            <>
            <img src={yelp.image_url} alt='yelp image'/>
            <a href={yelp.url} key={index}>link </a>
            </>
        ));
        return <div>{yelp}</div>;
        
    }
}

export default Yelp;