import { action, computed, observable, autorun } from "mobx";

import { IBulkCityWeather } from "../api/bulkCities";
import { ICityWeatherResponse } from "../api/cityWeatherResponse";

class WeatherStore {
    constructor() {
        this.retrieveFromCache();
    }

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
        city = this.normalizeData(city);
        const alreadyAddedIdx = this.savedCities.findIndex((x) => x.name === city.name);
        if(alreadyAddedIdx >= 0) {
            this.savedCities[alreadyAddedIdx] = city;
        } else {
            this.savedCities.push(city);
        }
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

    saveToCache = (cities: ICityWeatherResponse[]) => {
        localStorage.setItem('saved_cities', JSON.stringify(cities));
    }

    retrieveFromCache = () => {
        const savedCitiesJson = localStorage.getItem('saved_cities');
        this.savedCities = savedCitiesJson ?  JSON.parse(savedCitiesJson) : [];
    }

    private normalizeData = (city: ICityWeatherResponse) => {
        city.dt = new Date().getTime();
        city.main.temp = toCelcius(city.main.temp);
        city.main.temp_max = toCelcius(city.main.temp_max);
        city.main.temp_min = toCelcius(city.main.temp_min);
        return city;
    }
}

export const weatherStore = new WeatherStore();

autorun(() => {
    weatherStore.saveToCache(weatherStore.savedCities);
});

const toCelcius = (kelvin: number) => kelvin - 273.15;