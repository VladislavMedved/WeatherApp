export interface ICityWeatherResponse {
    name: string;
    dt: number;
    main: IMainInfo;
    wind: IWind;
}

interface IMainInfo {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface IWind {
    speed: number;
    deg: number;
}