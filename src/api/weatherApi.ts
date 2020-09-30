import axios, { AxiosResponse } from "axios";

import { ICityWeatherResponse } from "../stores/weatherStore";

interface IWeatherApi {
    getCityWeather: (city: string) => Promise<ICityWeatherResponse>;
}

const API_KEY = '54347ec58968bdc056e265da040c6ef3';

class WeatherApi implements IWeatherApi {
    getCityWeather = async (city: string | undefined) => {
        const response: AxiosResponse<ICityWeatherResponse> = await axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
            responseType: 'json',
        });
        return response.data;
    }
}

export const weatherApi = new WeatherApi();