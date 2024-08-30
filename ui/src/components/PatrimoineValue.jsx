import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PatrimoineValue({ onGetValue }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleValidate = () => {
    if (selectedDate) {
      onGetValue(selectedDate);
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Sélectionnez une date"
      />
      <button
        onClick={handleValidate}
        style={{ marginLeft: '10px', padding: '5px 10px' }}
      >
        Valider
      </button>
    </div>
  );
}

export default PatrimoineValue;
