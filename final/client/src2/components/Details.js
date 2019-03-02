import React from "react";

function Details(props) {
    return (
        <form>
            <div className="form-group">
            <label htmlFor="location">Location: </label>
            <input
                    onChange={props.handleInputChange}
                    value={props.value}
                    name="location"
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    id="location"
                />
                <br/>
            <label htmlFor="category">Category: </label>
                <input
                    onChange={props.handleInputChange}
                    value={props.value}
                    name="category"
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    id="category"
                />
                <button onClick={props.handleFormSubmit} className="btn btn-primary">
                Search Restaurant
                </button>
            </div>
           
        </form>
    );
    
}

export default Details;