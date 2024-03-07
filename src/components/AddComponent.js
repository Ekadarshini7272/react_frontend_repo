import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import styles from "../styles/styles.css"

const AddComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    console.log('Adding data:', { title, description });
    axios.post('http://localhost:5000/api/data/add', { title, description })
      .then(response => {
        console.log('Data added successfully:', response.data);
        // Reset input fields
        setTitle('');
        setDescription('');
        
        // Display execution time
        console.log('Execution time:', response.data.executionTime);
      })
      .catch(error => {
        console.error('Error adding data:', error);
      });
  };

  return (
    <div className="component-container">
      <h3>Add Data</h3>
      <Form>
        <Form.Group controlId="formTitle" className='mb-3'>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
        </Form.Group>

        <Form.Group controlId="formDescription" className='mb-3'>
          <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter description" />
        </Form.Group>
        <Button onClick={handleAdd} className='card-btn'>Create</Button>
      </Form>
    </div>
  );
};

export default AddComponent;
