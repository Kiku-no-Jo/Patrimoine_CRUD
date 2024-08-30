import React, { useState } from 'react';
import TablePatrimoine from './TablePatrimoine';
import Depreciation from './Chart';

function MainPage() {
  const [data, setData] = useState([]);

  const handleDataLoaded = (loadedData) => {
    setData(loadedData);
  };

  return (
    <div>
      <h1>Liste des possessions</h1>
      <Depreciation data={data} />
      <TablePatrimoine onDataLoaded={handleDataLoaded} />
    </div>
  );
}

export default MainPage;