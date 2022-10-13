import React from "react";

const TableRow = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.id + 1}</td>
          <td>{props.list.city}</td>
          <td>
            <img
              src={`https://countryflagsapi.com/png/${props.list.countryCode}`}
              width="120px"
              height="60px"
              alt={props.list.countryCode}
            />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TableRow;
