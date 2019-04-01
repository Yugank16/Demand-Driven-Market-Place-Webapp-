import React from 'react';

const AllBids = (props) => (
    <div>
        <div className="request-list">
            <h2>List of Bids</h2>
            <div>
                {props.data}
            </div>
        </div>
    </div>

);


export default AllBids;
