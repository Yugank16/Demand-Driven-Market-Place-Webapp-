import React from 'react';
import './BidDetails.css';

const BidDetails = (props) => (
    <div >
        <div className="content">
            {props.data.flag === false && 
            <div>
                <h2>Item Details </h2>
                <h4>{props.data.item.name}</h4>
                <h4>Ask Price:{props.data.item.max_price}</h4>
                <h4>Requested by:{props.data.item.requester.first_name}</h4>
            </div>}
            <h2>Bid Details</h2>
            {props.data.flag === false && <h3>Bid Price:{props.data.bid_price}</h3>}
            <h4>Description:{props.data.description}</h4>
            <h4>Photos:</h4>
            {props.data.images.map((image) => 
                <img className="images" src={image.image} alt="item" />)}          
        </div>
    </div>

);

export default BidDetails;
