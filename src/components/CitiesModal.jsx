/* eslint-disable react/prop-types */
import classes from '../styles/CitiesModal.module.css'
import { cities } from '../data/data'
import CityNameItem from './CityNameItem'

const CitiesModal = ({isOpen, setIsOpen, currentCity, changeCity}) => {

  return (
    <div className={classes.modal} onClick={(e) => {setIsOpen(false);e.preventDefault()}} style={{display: isOpen ? 'flex' : "none"}}>
      <button className={classes.exit}>X</button>
      <h1 className={classes.title}>Select a city</h1>
      <div className={classes.content}>
        {cities.filter(city => city !== currentCity).map(city => 
            <CityNameItem key={city} city={city} className={classes.city} changeCity={(city) => changeCity(city)}/>	
        )}
        <div className={classes.content_cover}></div>
      </div>
    </div>
  )
}

export default CitiesModal