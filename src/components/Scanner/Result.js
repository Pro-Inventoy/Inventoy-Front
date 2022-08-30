import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ result }) => (
    <li>
       { console.log('Im resulting here')}
        {result.codeResult.code} [{result.codeResult.format}]
    </li>
);

Result.propTypes = {
    result: PropTypes.object
};

export default Result;