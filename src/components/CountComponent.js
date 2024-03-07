import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountComponent = () => {
  const [count, setCount] = useState({ addCount: 0, updateCount: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/data/count')
      .then(response => {
        console.log('Count data:', response.data);
        setCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching count data:', error);
      });
  }, []);

  return (
    <div>
      <h3>API Call Counts</h3>
      <h4>Add API Calls: {count.addCount}</h4>
      <h4>Update API Calls: {count.updateCount}</h4>
    </div>
  );
};

export default CountComponent;
