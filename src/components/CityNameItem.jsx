/* eslint-disable react/prop-types */
import classes from '../styles/CityNameItem.module.css'

const CityNameItem = ({changeCity, city}) => {
  return (
	<div className={classes.city} onClick={() => changeCity(city)}>{city}</div>	
  )
}

export default CityNameItem