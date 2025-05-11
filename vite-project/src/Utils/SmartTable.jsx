import React from "react";

const SmartTable = ({ data, columns }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col, j) => (
              <td key={j}>
                {col.render ? col.render(row, i) : row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SmartTable;
