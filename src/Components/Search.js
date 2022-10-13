import axios from "axios";
import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

const Search = () => {
  const [val, setVal] = useState("");
  const [limit, setLimit] = useState(5);
  const [data, setData] = useState([]);

  //   fires when search input is changed
  const onSearch = (e) => {
    e.preventDefault();
    setVal(e.target.value);
  };

  //   fires wehe limit is changed
  const limChange = (e) => {
    if (limit > 9 || limit < 2) {
      alert("Please enter limit between 1-10");
    }
    setLimit(e.target.value);
  };

  useEffect(() => {
    if (val !== "") {
      document.getElementById("table").style.display = "block";
      document.getElementById("start-search").style.display = "none";
    } else if (val === "") {
      document.getElementById("table").style.display = "none";
      document.getElementById("start-search").style.display = "block";
    }
    const fetchData = () => {
      var options = {
        method: "GET",
        url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        params: { countryIds: "", namePrefix: val, limit: limit },
        headers: {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key":
            "4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchData();
    console.log(data);
    if (data.length === 0) {
      document.getElementById("no-data").style.display = "block";
    } else {
      document.getElementById("no-data").style.display = "none";
    }
  }, [val, limit,data]);
  return (
    <>
      <div className="search">
        <input
          type="text"
          value={val}
          onChange={onSearch}
          placeholder="Search Places..."
        />

        <input type="number" value={limit} onChange={limChange} />
        <br />
        {/* <span> {val}</span> */}
      </div>
      <div className="data-container">
        <div id="start-search">
          <h2>Start Searching ...</h2>
        </div>
        <div id="table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Place Name</th>
                <th>Country</th>
              </tr>
            </thead>

            <div id="no-data">
              <h2>No Data Found...</h2>
            </div>
            {data.map((value, index) => {
              return <TableRow key={index} id={index} list={value} />;
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Search;
