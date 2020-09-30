export interface IBulkCityWeather {
    city: IBulkCity;
    //etc.
}

interface IBulkCity {
    id:number,
    name: string,
    findname: string,
    country:string,
    coord: any;
    zoom: number;
}