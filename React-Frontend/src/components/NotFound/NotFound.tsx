import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h4>The Page does not exist</h4>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
