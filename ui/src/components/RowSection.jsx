import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function RowSection({ tableRow }) {
  const [rows, setRows] = useState(tableRow);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleFinalDateClick = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate('');
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSaveDate = () => {
    if (new Date(selectedDate) <= new Date()) {
      alert('La date de fin doit être supérieure à aujourd\'hui.');
      return;
    }

    const newRows = [...rows];
    newRows[currentIndex].dateFin = selectedDate;
    setRows(newRows);
    handleCloseModal();

    console.log('FinalDate row at index', currentIndex, 'set to', selectedDate);
   
  };

  const handleDelete = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    console.log('Row deleted at index', index);
    
  };

  return (
    <>
      {rows.map((row, index) => (
        <tr key={index}>
          <td>{row.libelle}</td>
          <td>{row.valeur}</td>
          <td>{row.dateDebut}</td>
          <td>{row.dateFin || 'N/A'}</td>
          <td>{row.tauxAmortissement}</td>
          <td>{row.valeurActuel || 'N/A'}</td>
          <td>
            <Button variant="primary" size="sm">Update</Button>
            <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(index)}>Delete</Button>
            <Button variant="warning" size="sm" onClick={() => handleFinalDateClick(index)} className="ms-2">FinalDate</Button>
          </td>
        </tr>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Set Final Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Final Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveDate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RowSection;
