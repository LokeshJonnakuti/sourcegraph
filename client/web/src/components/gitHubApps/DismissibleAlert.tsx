import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const DismissibleAlert: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    showAlert && (
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
        Your GitHub App did not finish connecting to Sourcegraph correctly.
        You may need to remove the GitHub App and try again.
      </Alert>
    )
  );
};

export default DismissibleAlert;
