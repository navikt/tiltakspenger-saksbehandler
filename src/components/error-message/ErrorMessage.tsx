import React from 'react';
import { Alert } from '@navikt/ds-react';

interface ErrorMessageProps {
    errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
    return (
        <Alert variant="error" fullWidth>
            {errorMessage}
        </Alert>
    );
};

export default ErrorMessage;
