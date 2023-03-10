
import './App.css';
import Current_weather from './Components/current-weather/Current_weather';
import Search from './Components/search/Search';
import{WEATHER_API_URL, WEATHER_API_KEY} from "./Api"
import { useState } from 'react';
import Forecast from './Components/forecast/Forecast';

function App() {

  const [currentWeather,setCurrentWeather]=useState(null)
  const [forecast,setForecast]=useState(null)


 const handleOnSearchChange=(searchData)=>{
  const [lat, lon]=searchData.value.split(" ")
  const currentWeatherFetch=fetch (`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
  const forecastFetch=fetch (`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

 Promise.all([currentWeatherFetch,forecastFetch])
 .then(async(response)=>{
  const weatherResponse=await response[0].json();
  const forecastResponse=await response[1].json();
  setCurrentWeather({city: searchData.lable , ...weatherResponse})
  setForecast({city: searchData.lable , ...forecastResponse})
 })
 .catch((err)=> console.log(err));
 }
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <Current_weather data={currentWeather}/>}
       {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
