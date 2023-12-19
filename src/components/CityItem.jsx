/* eslint-disable react/prop-types */
import classes from '../styles/CityItem.module.css'
import { MdDelete } from "react-icons/md";


const CityItem = ({name, status, icon, temprature, deleteCity}) => {
  return (
	<div className={classes.item} >
		{name != "Almaty" && <button className={classes.delete} onClick={() => deleteCity(name)}><MdDelete className={classes.del}/></button>}
		{icon && <img className={classes.icon} src={icon} alt="" />}
		<div className={classes.data}>
			<h2 className={classes.city}>{name}</h2>
			<h3 className={classes.status}>{status}</h3>
		</div>
		<h4 className={classes.temprature}>{temprature.toFixed(0)}&#176;</h4>
	</div>
  )
}

export default CityItem