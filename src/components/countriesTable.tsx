import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { ICityWeatherResponse } from '../api/cityWeatherResponse';

import { weatherStore } from "../stores/weatherStore";
import { weatherApi } from '../api/weatherApi';
import { Title } from './title';

const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
}));

const refreshData = async () => {
    [...weatherStore.savedCities].forEach(async element => {
        const weather = await weatherApi.getCityWeather(element.name);
        weatherStore.addCity(weather);
    });
};

export const WeatherTable = observer(() => {
    const classes = useStyles();

    useEffect(() => {
        const interval = setInterval(() => {
            refreshData();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Title>Recent cities</Title>
            <Table aria-label="a dense table">
                <TableHeader />
                <TableBody>
                    {weatherStore.savedCities.map((city: ICityWeatherResponse) => (
                        <TableRow key={city.name}>
                            <TableCell component="th" scope="row">{city.name}</TableCell>
                            <TableCell align="right">{city.main.temp}</TableCell>
                            <TableCell align="right">{city.main.humidity}</TableCell>
                            <TableCell align="right">{city.main.pressure}</TableCell>
                            <TableCell align="right">{city.wind.deg}° - {city.wind.speed}meter/sec</TableCell>
                            <TableCell align="right">{new Date(city.dt).toLocaleTimeString()}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="secondary" onClick={() => weatherStore.removeCity(city)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                Max Tempreture: {weatherStore.maxTempretureCity}
                <br /> <br />
                Min Tempreture: {weatherStore.minTempretureCity}
            </div>
        </>
    );
})

const TableHeader = () => (
    <TableHead>
        <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Temperature, °C</TableCell>
        <TableCell align="right">Humidity</TableCell>
        <TableCell align="right">Atm. Pressure</TableCell>
        <TableCell align="right">Wind</TableCell>
        <TableCell align="right">Last Updated</TableCell>
        <TableCell align="right"/>
        </TableRow>
    </TableHead>
);
