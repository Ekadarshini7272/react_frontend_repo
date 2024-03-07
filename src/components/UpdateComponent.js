import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateComponent = () => {
  const [ids, setIds] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchAllIds();
  }, []);

  const fetchAllIds = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/data/getall`);
      setIds(response.data);
    } catch (error) {
      console.error('Error fetching IDs:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const startTime = Date.now(); // Record start time
      const response = await axios.put(`http://localhost:5000/api/data/update/${id}`, { title, description });
      const endTime = Date.now(); // Record end time
      const executionTime = endTime - startTime; // Calculate execution time
      console.log('Data updated successfully:', response.data);
      console.log('Execution time:', executionTime, 'ms'); // Display execution time
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h3>Update Data</h3>
      <Form>
        <Form.Group controlId="formId" className='mb-3'>
          <Form.Label>Select ID</Form.Label>
          <Form.Control as="select" value={id} onChange={e => setId(e.target.value)}>
            {ids.map(id => (
              <option key={id._id} value={id._id}>{id._id}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formTitle" className='mb-3'>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
        </Form.Group>

        <Form.Group controlId="formDescription" className='mb-3'>
          <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter description" />
        </Form.Group>

        <Button onClick={handleUpdate} className='card-btn'>Update</Button>
      </Form>
    </div>
  );
};

export default UpdateComponent;
