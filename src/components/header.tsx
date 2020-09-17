import React, {useState} from 'react';
import axios, { AxiosResponse } from "axios";

import { ICityWeatherResponse, weatherStore } from "../weatherStore";
import { Asynchronous } from './searchInput';

export const Header = () => {
  return (
    <div className="button-cluster">
        <div className="button-cluster__left-sub-cluster"/>
        <div className="button-cluster__right-sub-cluster">
            <SearchInput />
            <Asynchronous />
        </div>
    </div>
  );
}
const API_KEY = '54347ec58968bdc056e265da040c6ef3';

const SearchInput = () => {
    const [city, setCity] = useState<string>();

    const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.currentTarget.value);
    }

    const onSubmit = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        try {
            const response: AxiosResponse<ICityWeatherResponse> = await axios({
              method: 'get',
              url: url,
              responseType: 'json'
            });
            weatherStore.addCity(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <>
            <input
                className="search-input"
                value={city}
                onChange={onCityChange}
                type="search" name="search-city"
                placeholder="Search city or ZIP"
            />
            <button
              className="button search-input__button"
              onClick={onSubmit}
            >
              Search
            </button>
        </>
    )
}