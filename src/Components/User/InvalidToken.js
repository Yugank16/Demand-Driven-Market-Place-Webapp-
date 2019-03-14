import React from 'react';
import { Link } from 'react-router-dom';

const InvalidToken = () => (
    <div>
        <h2>Invalid Token</h2>
        <Link to='/'>Login</Link>
    </div>

);

export default InvalidToken;
