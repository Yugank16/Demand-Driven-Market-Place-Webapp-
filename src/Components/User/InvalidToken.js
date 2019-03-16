import React from 'react';
import { Link } from 'react-router-dom';

import { UserConstants } from '../../Constants/index';

const InvalidToken = () => (
    <div>
        <h2> {UserConstants.INVALID_TOKEN_MESSAGE} </h2>
        <Link to="/">Login</Link>
    </div>

);

export default InvalidToken;
