import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import { WEATHER_URL, WEATHER_API } from '../constants';
import WindSpeed from './WindSpeed';


class ForecastContainer extends React.Component {
   state = {
      dailyData: [],
      loading: false,
      error: false,
      degreeType: 'fahrenheit',
      mileageType: 'mph'
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
                  feelsLike: item.main.feels_like,
                  humidity: item.main.humidity,
                  windSpeed: item.wind.speed
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

   updateForecastDegree = ({target: {value}}) => {
      this.setState({ degreeType: value});
   }

   updateMileageType = ({target: {value}}) => {
      this.setState({mileageType: value})
   }


   render() {
      const {loading, error, dailyData, degreeType, mileageType} = this.state

      return(
         <div className='container mt-5 b-3'>
            <h1 className='display-1 jumbotron bg-light py-5 mb-5 d-flex justify-content-center'>5 Day Forecast</h1>
            <h5 className='text-muted d-flex justify-content-center'>Los Angeles, CA</h5>
            <DegreeToggle 
               updateForecastDegree={this.updateForecastDegree}
               degreeType ={degreeType}
            />
            <WindSpeed 
               updateMileageType = {this.updateMileageType}
               mileageType = {mileageType}
            />
            <div className="row justify-content-center ">
               {!loading ? dailyData.map((item) => (
                  <DayCard 
                     data={item} 
                     key={item.dt}
                     degreeType ={degreeType}
                     mileageType = {mileageType}
                  />
               )) : <div> Loading....</div>}
            </div>
            {error && <h3 className='text-danger d-flex justify-content-center'>Error Loading Data 😔</h3>}
         </div>
      )
   }
};

export default ForecastContainer;