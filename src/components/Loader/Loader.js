import React from 'react';
import { Spinner } from 'reactstrap';

import './Loader.scss';

export default ({message}) => <div className="loader-container">
    <div className="loader-inner">
        <Spinner />
        {message && <div className="message">{message}</div>}
    </div>
</div>