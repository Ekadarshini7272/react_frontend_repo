import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateComponent = () => {
  const [ids, setIds] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

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

  const handleUpdate = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // Set validated to true to display validation errors
      setValidated(true);
      return;
    }

    try {
      const startTime = Date.now();
      const response = await axios.put(`http://localhost:5000/api/data/update/${id}`, { title, description });
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      console.log('Data updated successfully:', response.data);
      console.log('Execution time:', executionTime, 'ms');

      // Reset input fields
      setTitle('');
      setDescription('');

      // Reset validation status
      setValidated(false);
      setError('');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Please try again.');
    }
  };

  return (
    <div>
      <h3>Update Data</h3>
      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <Form.Group controlId="formId" className='mb-3'>
          <Form.Label>Select ID</Form.Label>
          <Form.Control as="select" value={id} onChange={e => setId(e.target.value)} required>
            <option value="">Select an ID</option>
            {ids.map(id => (
              <option key={id._id} value={id._id}>{id._id}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select an ID.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTitle" className='mb-3'>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid title (4-8 characters).
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription" className='mb-3'>
          <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter description" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid description (max 70 characters).
          </Form.Control.Feedback>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button type="submit" className='card-btn'>Update</Button>
      </Form>
    </div>
  );
};

export default UpdateComponent;
