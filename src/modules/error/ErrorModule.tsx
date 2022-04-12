import React from 'react';
import { ErrorModuleProps } from './types';

const Error = ({ statusCode }: ErrorModuleProps) => {
    return (
        <p>
            {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
      </p>
    );
};

export default Error;