import React from 'react';
import Stock from './Stock';
import data from './stockData';

const App = () => {
  return (
    <div className="App">
      <Stock data={data} />
    </div>
  );
};

export default App;
