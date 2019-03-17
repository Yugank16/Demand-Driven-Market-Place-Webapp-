import React from 'react';
import Dashboard from '../../Containers/Dashboard';

const RequestItem = (props) => (
    <div>
        <Dashboard />
        <div className="content">
            <div>
                {props.data}
            </div>
        </div>
    </div>

);


export default RequestItem;
