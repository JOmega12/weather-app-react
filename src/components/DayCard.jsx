import React from 'react';
import moment from "moment";


const DayCard = ({data}) => {
   const {temp, date, dt, imgId, desc} = data

   const newDate = new Date();
   newDate.setTime(dt * 1000);
   const icon = `owf owf-${imgId} owf-5zx`;

   return (
      <div className='col-sm-2'>
         <div className="card">
            <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
            <p className="text-mute">{moment(newDate).format('MMMM Do, h:mm a')}</p>
            <i className={icon}/>
            <div>
            <i className={icon}/>

            </div>
            <h2>{Math.round(temp)} ℉</h2>
            <div className="card-body">
               <p className="card-text">{desc}</p>
            </div>
         </div>
      </div>
   )
}


export default DayCard;