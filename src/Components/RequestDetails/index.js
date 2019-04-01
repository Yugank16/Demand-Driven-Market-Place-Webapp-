import React from 'react';
import moment from 'moment';


const RequestItemDetails = (props) => (
    <div >
        <div className="content">
            <h2>{props.data.name}</h2>
            <h3>By :{props.data.requester.first_name}</h3>
            <h3>Price :{props.data.max_price}</h3>
            <h3>Description :{props.data.short_description}</h3>
            <h3>Months Old : {props.data.months_old}</h3>
            <h3>Quantity Required : {props.data.quantity_required}</h3>
            <h3>More Information : {props.data.more_info}</h3>
            <h3>Required On : {moment(props.data.date_time).format('llll')} </h3>
        </div>
    </div>

);

export default RequestItemDetails;
