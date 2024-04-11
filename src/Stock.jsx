import React, { useState } from 'react';
import './Stock.css'; 

const Stock = ({ data }) => {
  const [selectedStock, setSelectedStock] = useState(data[0]);
  const [daysPerPage, setDaysPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const handleStockChange = (e) => {
    const stock = data.find((item) => item.stockName === e.target.value);
    setSelectedStock(stock);
  };

  const handleDaysPerPageChange = (e) => {
    setDaysPerPage(parseInt(e.target.value));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculatePageCount = () => {
    return Math.ceil(selectedStock.info.length / daysPerPage);
  };

  const renderStockInfo = () => {
    const startIndex = currentPage * daysPerPage;
    const endIndex = startIndex + daysPerPage;
    const selectedInfo = selectedStock.info.slice(startIndex, endIndex);

    return selectedInfo.map((item) => (
      <tr key={item.date}>
        <td>{item.date}</td>
        <td className={item.open > item.close ? 'green' : 'red'}>{item.open}</td>
        <td className={item.close > item.open ? 'green' : 'red'}>{item.close}</td>
      </tr>
    ));
  };

  return (
    <div className="stock-viewer">
      <h1>Stock Viewer</h1>
      <div className="filters">
        <label>
          Select Stock:
          <select onChange={handleStockChange}>
            {data.map((item) => (
              <option key={item.stockName} value={item.stockName}>
                {item.stockName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Days per page:
          <select onChange={handleDaysPerPageChange} value={daysPerPage}>
            {[3, 5, 10].map((days) => (
              <option key={days} value={days}>
                {days}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>{renderStockInfo()}</tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: calculatePageCount() }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stock;
