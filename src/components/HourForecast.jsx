/* eslint-disable react/prop-types */
import classes from '../styles/HourForecast.module.css'

const HourForecast = ({temp_c, condition, time}) => {
  return (
    <div className={classes.item}>
      <h3 className={classes.time}>{time.substring(11, time.length)}</h3>
      <img src={condition.icon} className={classes.icon} alt="" />
      <h2 className={classes.temp}>{temp_c.toFixed(0)}&#176;</h2>
    </div>
  )
}

export default HourForecast