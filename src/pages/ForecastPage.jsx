import classes  from '../styles/ForecastPage.module.css'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { WiStrongWind } from "react-icons/wi";
import { IoWater } from "react-icons/io5";
import formatDateString from '../helpers/formatDateString';
import { FaEye } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { cities } from '../data/data';
import { FaLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { Container, Row } from 'react-bootstrap';

const ForecastPage = () => {

	const {city} = useParams()
	const months = ['Jan', 'Feb', 'Apr', 'May', "Mar", 'June', "July", 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const [forecast, setForecast] = useState()

	console.log(city)
	useEffect(() => {
		fetchData(city)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city])

	const fetchData = async (city) => {
		const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
      q: city,
      days: '3'
      },
      headers: {
      'X-RapidAPI-Key': '21984204b7msh3267a67b6624b0ep1c87b2jsn6053aef7f9e6',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setForecast(response.data)
    } catch (error) {
      console.error(error);
    }
	};

	if(forecast == undefined) 
		return <div className={classes.loader}></div>
	else if (forecast) {
  return (
	<Container className={classes.page}>
		<Row className={classes.head}>
			<Link to={'/'} className={classes.back}><FaLongArrowAltLeft className={classes.icon}/><h1>Go Back</h1></Link>
			<div className={classes.main}>
				<div className="location">
				<h1 className={classes.city}><FaLocationDot className={classes.locationIcon} />{forecast.location.name}</h1>
				<h2 className='date'>{formatDateString(forecast.location.localtime)}</h2>
				</div>
			</div>
		</Row>
		<Row className={classes.days}>
			{forecast.forecast.forecastday.map((day, indx) => 
				(<div key={day.date.toString()} className={classes.day}>
					<h2 className={classes.dayHeader}>{['Today', 'Tomorrow', "After Tomorrow"][indx]}</h2>
					<div className={classes.dayContent}>
						<div className={classes.mainInfo}>
							<WiStrongWind className={classes.icon} alt="" />
							<h3 className={classes.temp}>{day.day.maxtemp_c.toFixed(0) + ' / ' + day.day.mintemp_c.toFixed(0)}&#176;</h3>
							<h4 className={classes.condition }>{day.day.condition.text}</h4>
						</div>
						<div className={classes.additionalInfo}>
							<h2 className={classes.date}>{new Date(day.date).getDate() + " " + months[new Date(day.date).getMonth()]}</h2>
							<div className={classes.avgInfo}>
							<IoWater className={classes.icon}/>
							<h3 className={classes.avgTxt}>{day.day.avghumidity+" "}%</h3>
							</div>
							<div className={classes.avgInfo}>
							<FaEye className={classes.icon}/>
							<h3 className={classes.avgTxt}>{day.day.avgvis_km+" "}km</h3>
							</div>
						</div>
					</div>
				</div>) )}
			</Row>
			<h1 className={classes.title}>Select City:</h1>
			<div className={classes.list}>
				{cities.map(c => 
					<Link style={{border: c == city ? "2px gold solid" : 'initial'}} to={`/forecast/${c}`}  key={c} className={classes.cityItem}>{c}<FaCity className={classes.cityIcon}/></Link>		
				)}
			</div>
		</Container>
		)
	}
	else {
		return <h1>Error</h1>
	}
}

export default ForecastPage