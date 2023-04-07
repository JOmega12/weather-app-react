import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import { WEATHER_URL, WEATHER_API } from '../constants';


class ForecastContainer extends React.Component {
   state = {
      dailyData: [],
      loading: false,
      error: false,
   }

   async componentDidMount() {
      this.setState(({loading: true}))
      try {
         const response = await fetch(`${WEATHER_URL}${WEATHER_API}`); // this gets the data
         if (response.ok) {
            // console.log(response, 'response');
            // const json = await response.json(); //this parses the data
            const json = await response.json();
            console.log(json, 'json');
            const data = json.list
               .filter(day => day.dt_txt.includes('00:00:00'))
               .map(item => ({
                  temp: item.main.temp,
                  dt: item.dt,
                  date: item.dt_txt,
                  imgId: item.weather[0].id,
                  desc: item.weather[0].description,
               }));
               console.log(data)
               this.setState({
                  dailyData: data,
                  loading: false,
               });
         } else {
            //do something 
            this.setState(({
               loading: false,
               error: true,
            }));
         }
      } catch(err) {
         console.log('There is Error', err);
      }
   }


   render() {
      const {loading, error, dailyData} = this.state

      return(
         <div>
            <div>Forecast Container</div>
            <DegreeToggle />
            {!loading ? dailyData.map((item) => (
               <DayCard data={item} key={item.dt}/>
            )) : <div> Loading....</div>}
         </div>
      )
   }
};

export default ForecastContainer;