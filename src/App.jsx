import { useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [error, setError] = useState('');
  function displayData(e) {
    e.preventDefault();
    axios({
      method: 'get',
      url: `http://api.weatherapi.com/v1/current.json?key=16f54e5cb33f48f694a123243250801&q=${city}`
    })
      .then((response) => {
        setWeatherData(response.data);
        setError('');
      })
      .catch((err) => {
        setError(err.response.data.error.message);
        setWeatherData('');
      })
  }
  return (
    <>
      <div className='container mt-5'>
        <div className="row d-flex justify-content-center">
          <div className="col-4">
            <form className="mb-3" onSubmit={displayData}>
              <label className="form-label">Enter City</label>
              <input type="text" className="form-control" placeholder="Lahore" onInput={(event) => { setCity(event.target.value) }}required />
              <button type='submit' className='btn btn-primary mt-3'>Submit</button>
            </form>
          </div>
        </div>
        {weatherData && (<div className="row mt-5">
          <h3>City: {weatherData.location.name}</h3>
          <h3>Region: {weatherData.location.region}</h3>
          <h3>Country: {weatherData.location.country}</h3>
          <h3>Local Time: {weatherData.location.localtime}</h3>
          <h3>Weather: {weatherData.current.temp_c} °C</h3>
          <h3>Humidity: {weatherData.current.humidity}%</h3>
          <h3>Cloud: {weatherData.current.cloud}%</h3>
          <h3>Wind: {weatherData.current.wind_kph} kph</h3>
        </div>)}

        {error && (
          <div class="alert alert-danger mt-3" role="alert">
            <h3>{error}</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default App
