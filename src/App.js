import React, { useState } from "react";
import "./App.css";
import fetch from "node-fetch"

const zipcode = "10026"


async function fetchData(url, zipcode) {
  const url = `https://ctp-zip-api.herokuapp.com/zip/${zipcode}`
  let response = await fetch(url);
  let data = await response.json();

  return data.map((element) => {
    return {
      city: element.LocationText,
      state: element.State,
      location: [element.Lat, element.Lat],
      population: element.EstimatedPopulation,
      totalWages: element.TotalWages,

    }
  });
}

function City(props) {
  const { location, state, population, totalWages } = [...props]
  return (
    <div>
      <h1>{location}</h1>
      <ul>
        <li>{`State: ${state}`}</li>
        <li>{`location: ${location}`}</li>
        <li>{`Population (estimate): ${population}`}</li>
        <li>{`Total Wages: ${totalWages}`}</li>
      </ul>
    </div>
  )
}

function ZipSearchField(props) {
  const [zip, setInputZip] = useState('0000')
  const handleChange = (event) => {
    event.persist();
    

    (event.target.value.length >= 5) ? setInputZip((zip) => ({
      zip: event.target.value
    })) : zip
  }


  return (
    <>
      <form>
        <label>
          Zip-Code
          <input
            id="zip-search-field"
            class="search-field"
            type="text"
            placeholder="zip"
            name="zip-code"
            value={zip}
            oncChange={handleChange}
          />
        </label>
      </form>
    </>
  )
}

function Results(props) {
  return (
    <>
    </>)
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField />
        <div>
          <Results />
        </div>
      </div>
    </div>
  );
}


