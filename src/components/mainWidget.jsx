import React from 'react';

export const MainWidget = () => {
  return (
    <div className="main-wrapper">
        <div className="weather-data-cluster">
            <p className="weather-data-cluster__location">Belarus</p>
            <p className="weather-data-cluster__date-time">Thu 17 September &nbsp; 19:56</p>
            <p className="weather-data-cluster__temperature-today">11</p>
            <img className="weather-data-cluster__weather-icon"
                alt="clear-night" src="img/clear-night.png" />
            <div className="weather-data-cluster__weather-data">
                <p>Clear</p>
                <p>Feels Like: 11°</p>
                <p>Wind: 9 m/s</p>
                <p>Humidity: 70%</p>
            </div>
            <div className="forecast">
                <p className="forecast__day">Friday</p>
                <p className="forecast__temperature">10°</p>
                <img className="forecast__icon" alt="partly-cloudy-day"
                    src="img/partly-cloudy-day.png" />
            </div>
            <div className="forecast">
                <p className="forecast__day">Saturday</p>
                <p className="forecast__temperature">12°</p>
                <img className="forecast__icon" alt="clear-day"
                    src="img/clear-day.png"/>
            </div>
            <div className="forecast">
                <p className="forecast__day">Sunday</p>
                <p className="forecast__temperature">11°</p>
                <img className="forecast__icon" alt="partly-cloudy-day"
                    src="img/partly-cloudy-day.png"/>
            </div>
        </div>  
    </div>
  );
}
