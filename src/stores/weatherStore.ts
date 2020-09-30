import { action, computed, observable } from "mobx";

import { IBulkCityWeather } from "../api/bulkCities";

class WeatherStore {
    @observable
    savedCities: ICityWeatherResponse[] = [];

    suggestionCities: IBulkCityWeather[] = [];

    @computed
    get maxTempretureCity() {
        const maxCity = this.savedCities.reduce((prev, current) => (prev.main?.temp > current.main?.temp) ? prev : current, { name: '' } as ICityWeatherResponse);
        return maxCity?.name;
    }

    @computed
    get minTempretureCity() {
        const minCity = this.savedCities.reduce((prev, current) => (prev.main?.temp < current.main?.temp) ? prev : current, { name: '' } as ICityWeatherResponse);
        return minCity?.name;
    }

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

    saveCitiesForSuggestion(cities: IBulkCityWeather[]) {
        this.suggestionCities = cities;
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