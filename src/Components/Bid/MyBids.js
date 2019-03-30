import React from 'react';

const MyBids = (props) => (
    <div>
        <div className="bid-list">
            <h1>Your Bids</h1>
            <div>
                {props.data}
            </div>
        </div>
    </div>

);

export default MyBids;
