import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import styles from "../styles/styles.css";

const AddComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = (event) => {
    event.preventDefault();
  
    // Clear error message
    setError('');
  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // Set validated to true to display validation errors
      setValidated(true);
      // Exit function if form is invalid
      return;
    }
  
    axios.post('http://localhost:5000/api/data/add', { title, description })
      .then(response => {
        console.log('Data added successfully:', response.data);
        // Reset input fields
        setTitle('');
        setDescription('');
        
        // Reset validation status
        setValidated(false);
  
        // Display execution time
        console.log('Execution time:', response.data.executionTime);
      })
      .catch(error => {
        console.error('Error adding data:', error);
        setError('Please try again.');
      });
  };

  return (
    <div className="component-container">
      <h3>Add Data</h3>
      <Form noValidate validated={validated} onSubmit={handleAdd}>
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

        <Button type="submit" className='card-btn'>Create</Button>
      </Form>
    </div>
  );
};

export default AddComponent;
