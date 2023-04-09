import React from 'react';
import moment from "moment";


const DayCard = ({data, degreeType, mileageType}) => {
   const {temp, dt, imgId, desc, feelsLike, humidity, windSpeed} = data

   const newDate = new Date();
   newDate.setTime(dt * 1000);
   const icon = `owf owf-${imgId} owf-5zx`;
   // const icon = `owf owf-801 owf-5zx`;

   const fahrenheit = Math.round(temp);
   const celsius = Math.round((fahrenheit - 32) * (5 / 9));

   const fahrenheitFeelsLike = Math.round(feelsLike);
   const celsiusFeelsLike = Math.round((fahrenheitFeelsLike - 32) * (5 / 9));

   const humidityF = Math.round(humidity);
   const humdityC = Math.round((humidityF - 32) * (5 / 9))

   const mph = Math.round(windSpeed);
   const kph = Math.round((mph / 1.61));


   return (
      <div className='col-sm-2'>
         <div className="card">
            <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
            <p className="text-mute">{moment(newDate).format('MMMM Do, h:mm a')}</p>
            <i className={icon}/>
            <h2>{degreeType === 'celsius' ? `${celsius} ℃` : `${fahrenheit} ℉`}</h2>
            
            <div className="card-body">
               <p className="card-text">{desc}</p>
               <p className="card-text"> Feels Like: {degreeType === 'celsius' ? `${celsiusFeelsLike} ℃` : `${fahrenheitFeelsLike} ℉`}</p>
               <p className="card-text"> Humidity: {degreeType === 'celsius' ? `${humdityC} ℃` : `${humidityF} ℉`}</p>
               <p className="card-text"> Wind speed:  {mileageType === 'kph' ? `${kph} kph` : `${mph} mph`}</p>
            </div>
         </div>
      </div>
   )
}


export default DayCard;