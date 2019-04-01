import React from 'react';
import { Link } from 'react-router-dom';

const ItemUnsold = () => (
    <div >
        <div className="content">
            <h3>OOPS!</h3>
            <h4> There were no bids for your item </h4>
            <Link to="/home/request" > Make Another Request </Link>
        </div>
    </div>

);

export default ItemUnsold;
