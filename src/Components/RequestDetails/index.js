import React from 'react';

const RequestItemDetails = (props) => (
    <div >
        <div className="content">
            <h2 className="item-request">Item Request Details</h2>
            <h3>{props.data.name}</h3>
            <h4>By :{props.data.requester.first_name}</h4>
            <h4>Price :{props.data.max_price}</h4>
            <h4>Description :{props.data.short_description}</h4>
            <h4>Months Old : {props.data.months_old}</h4>
            <h4>Quantity Required : {props.data.quantity_required}</h4>
            <h4>More Information : {props.data.more_info}</h4>
            <h4>Required By Date: {props.date}</h4>
            <h4>Required By Time: {props.time}</h4>
        </div>
    </div>

);

export default RequestItemDetails;
