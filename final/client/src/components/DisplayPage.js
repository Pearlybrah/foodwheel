import React, { Component } from "react";
import Details from "./Details";
import API from "../utils/API";
import Card from "./Card";
    
class YelpApiSearch extends Component {
    state = {
        result: {},
        location: "alameda",
        category: "italian"
    };
    
    componentDidMount(){
        this.searchRestaurants(this.state.location, this.state.category);

    };

    searchRestaurants = (location, category) => {
        console.log("searchRestaurants", location, category);
        API.search(location, category)
        .then(res => {this.setState({ result: res.data.businesses})
        console.log(this.state.result)})
        
        .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    };
    handleFormSubmit = event => {
        event.preventDefault();
        this.searchRestaurants(this.state.location, this.state.category);
    };

    render(){
        return(
            <div>
                {this.state.result[0] ? (
                    <Card
                        heading={this.state.result[0].name}
                        title={this.state.result[0].name}
                        rating={this.state.result[0].rating}
                        phone={this.state.result[0].phone} 
                        />
                    ) : (
                    <h3>No results to Display</h3>
                    )
                }
                <Details 
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit} 
                />
            </div>
        );

    }
}

export default YelpApiSearch;