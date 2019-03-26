import React from 'react';
import './BidDetails.css';

const BidDetails = (props) => (
    <div >
        <div className="content">
            <h2>Bid Details</h2>
            {(!props.data.flag && props.data.item_status !== 3) && <h3>Bid Price:{props.data.bid_price}</h3>}
            <h3>Description:{props.data.description}</h3>
            {props.data.images.map((image) => 
                <img className="images" src={image.image} alt="item" />)}          
        </div>
    </div>

);

export default BidDetails;
