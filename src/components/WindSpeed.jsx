import React from 'react';


const WindSpeed = ({mileageType, updateMileageType}) => {

   return(
      <React.Fragment>
         <div className='d-flex justify-content-center '>
            <select name="windSpeed" id="windSpeed" onChange={updateMileageType}>
               <option value="mph">mph</option>
               <option value="kph">kph</option>
            </select>
         </div>
      </React.Fragment>
   )
}

export default WindSpeed