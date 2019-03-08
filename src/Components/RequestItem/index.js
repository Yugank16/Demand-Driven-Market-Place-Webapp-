import React from 'react';
import Dashboard from '../../Containers/Dashboard';
import FlashMessage from '../../Containers/FlashMessage';

const RequestItem = (props) => (
    <div>
        <div className="content">
            <div>
                <h2>Item List</h2>
                <table>
                    <tr>
                        <th>Item Name</th>
                        <th>Max Price</th>
                        <th>Requester</th>
                        <th>Sell</th>
                    </tr>
                    {props.data}
                </table>
            </div>
        </div>
    </div>

);


export default RequestItem;
