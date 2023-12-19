import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoWater } from "react-icons/io5";
import { WiStrongWind } from "react-icons/wi";
import { FaLongArrowAltRight } from "react-icons/fa";
import formatDateString from './helpers/formatDateString';
import CitiesModal from './components/CitiesModal'
import CityItem from './components/CityItem';
import HourForecast from './components/HourForecast';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Home() {

  const [forecastCities, setForecastCities] = useState([])
  const [currentCityName, setCurrentCityName] = useState("Almaty")
  const [currentCityForecast, setCurrentCityForecast] = useState()
  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState(false)

  useEffect(() => {
		fetchData('Almaty')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  const handleChangeCity = (city) => {
    fetchData(city)
  }
  console.log(forecastCities)

	const fetchData = async (cityName) => {
		const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
      q: cityName,
      days: '3'
      },
      headers: {
      'X-RapidAPI-Key': '21984204b7msh3267a67b6624b0ep1c87b2jsn6053aef7f9e6',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data)
      setForecastCities(prev => prev.find(city => city == response.data) ? prev : [...prev, response.data])
      setCurrentCityForecast(response.data)
    } catch (error) {
      console.error(error);
    }
	};
  console.log(currentCityName)

  if (!currentCityForecast)
    {return <div>Loading...</div>}
  else if (currentCityForecast && forecastCities.length)
    return (
      <div className='App'>
        <div className='background_gradient'>
          <div className='myContainer main'>
            <div className="location">
              <h1 className='city_name'><FaLocationDot className='locationIcon' />{currentCityForecast.location.name}</h1>
              <h2 className='date'>{formatDateString(currentCityForecast.location.localtime)}</h2>
            </div>
            <div className='main_panel'>
              <h1 className='temp'>{currentCityForecast.current.temp_c.toFixed(0)}&#176;</h1>
              <div className='condition'>
                <img src={currentCityForecast.current.condition.icon} className='main_icon' alt="" />
                <h2 className='condition_text'>{currentCityForecast.current.condition.text}</h2>
              </div>
            </div>
            <div className='info_panel'>
              <div className='metric'>
                <WiStrongWind className='metric_icon icon' />
                <h2 className='metric_value'>{currentCityForecast.current.wind_kph+" km/h"}</h2>
                <h4 className='metric_name'>Wind speed</h4>
              </div>
              <div className='metric'>
                <IoWater className='icon' size={60}/>
                <h2 className='metric_value'>{currentCityForecast.current.humidity+" %"}</h2>
                <h4 className='metric_name'>Humidity</h4>
              </div>
              <div className='metric'>
                <FaEye className='icon' size={60}/>
                <h2 className='metric_value'>{currentCityForecast.current.vis_km+" km"}</h2>
                <h4 className='metric_name'>Vision</h4>
              </div>
            </div>
            <div className='today'>
              <div className="today_heading">
                <h2 className='today_txt'>Today</h2>
                <Link to={`forecast/${currentCityName}`} className='forecast_link' onClick={() => {}}><h2>3-Day Forecast</h2><FaLongArrowAltRight/></Link>
              </div>            
            </div>
          </div>
          <div className="list">
            {currentCityForecast.forecast.forecastday[0].hour.map(hour => 
              <HourForecast key={hour.time} time={hour.time} temp_c={hour.temp_c} condition={hour.condition} is_day={hour.is_day}/>
            )} 
          </div>
          <div className='myContainer'>
            <div className='today'>
                <div className="today_heading">
                  <h2 className='today_txt'>Other cities</h2>
                  <button className='forecast_link' onClick={() => setIsCitiesModalOpen(true)}><h2>Add a city +</h2></button>
                </div>            
              </div>
          </div>
          <div className='cities'>
            {forecastCities.slice(1).map(city => 
              <div className='cityItem' onClick={() => {setCurrentCityName(city.location.name); setCurrentCityForecast(forecastCities.find(c => c.location.name == city.location.name))}} key={city.location.name}>
                <CityItem deleteCity={(cityName) => setForecastCities(prev => prev.filter(city => city.location.name != cityName).length <= 1 ? prev : prev.filter(city => city.location.name != cityName))} name={city.location.name} status={city.current.condition.text} icon={city.current.condition.icon} temprature={city.current.temp_c}/> 
              </div> 
            )}
          </div>
        </div>
        <CitiesModal currentCity={currentCityName} changeCity={(city) => handleChangeCity(city)} isOpen={isCitiesModalOpen} setIsOpen={setIsCitiesModalOpen} />
        {/* <ForecastModal isOpen={isForecastModalOpen} setIsOpen={setIsForecastModalOpen} forecast={currentCityForecast.forecast}/> */}
      </div>
    )
  else {
    return (<div>Error</div>)
  }
 
}

export default Home
