import { action, observable } from "mobx";

class WeatherStore {
    @observable
    savedCities: ICityWeatherResponse[] = [];

    @action
    addCity = (city: ICityWeatherResponse) => {
        this.savedCities.push(city);
    }

    @action
    removeCity = (city: ICityWeatherResponse) => {
        const index = this.savedCities.indexOf(city);
        if (index > -1) {
            this.savedCities.splice(index, 1);
        }
    }
}


export interface ICityWeatherResponse {
    name: string;
    dt: number;
    main: IMainInfo;
}

interface IMainInfo {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export const weatherStore = new WeatherStore();