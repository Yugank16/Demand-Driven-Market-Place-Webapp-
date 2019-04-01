import React from 'react';
import './BidDetails.css';
import { RequestItemConstants } from '../../Constants';

const BidDetails = (props) => (
    <div>
        <div className="content">
            <h2 className="item-request">Bid Details</h2>
            {props.data.flag === false && 
            <div>
                <h3>{props.data.item.name}</h3>
                <p>requested by - {props.data.item.requester.first_name}</p>
                <h5>Ask Price : {props.data.item.max_price}</h5>          
            </div>}
            {(props.data.flag === false || props.data.item.item_status > RequestItemConstants.ONHOLD) && <h5>Bid Price:{props.data.bid_price}</h5>}
            <h5>Description:{props.data.description}</h5>
            <h5>Photos:</h5>
            {props.data.images.map((image, index) => 
                <img key={index} className="images" src={image.image} alt="item" />)}          
        </div>
    </div>

);

export default BidDetails;
