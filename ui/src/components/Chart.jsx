import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

function Depreciation({ data, onFilter }) {
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [jour, setJour] = useState('');

  const handleValidate = () => {
    onFilter({ dateDebut, dateFin, jour });
  };

  const chartData = {
    labels: data.map(item => item.libelle),
    datasets: [
      {
        label: 'Valeur des possessions',
        data: data.map(item => item.valeur),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.1, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Valeur: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Libelle',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valeur',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          selected={dateDebut}
          onChange={(date) => setDateDebut(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Date de début"
        />
        <DatePicker
          selected={dateFin}
          onChange={(date) => setDateFin(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Date de fin"
          style={{ marginLeft: '10px' }}
        />
        <select
          value={jour}
          onChange={(e) => setJour(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          <option value="">Sélectionnez un jour</option>
          <option value="1">Lundi</option>
          <option value="2">Mardi</option>
          <option value="3">Mercredi</option>
          <option value="4">Jeudi</option>
          <option value="5">Vendredi</option>
          <option value="6">Samedi</option>
          <option value="7">Dimanche</option>
        </select>
        <button
          onClick={handleValidate}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Valider
        </button>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Depreciation;
