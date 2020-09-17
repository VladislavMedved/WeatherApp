import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { ICityWeatherResponse, weatherStore } from "../weatherStore";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const DenseTable = observer(() => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="a dense table">
                <TableHeader />
                <TableBody>
                {weatherStore.savedCities.map((city: ICityWeatherResponse) => (
                    <TableRow key={city.name}>
                        <TableCell component="th" scope="row">{city.name}</TableCell>
                        <TableCell align="right">{city.main.temp}</TableCell>
                        <TableCell align="right">{city.main.humidity}</TableCell>
                        <TableCell align="right">{city.main.pressure}</TableCell>
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
        </TableContainer>
    );
})

const TableHeader = () => (
    <TableHead>
        <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Temperature</TableCell>
        <TableCell align="right">Humidity</TableCell>
        <TableCell align="right">Atm. Pressure</TableCell>
        <TableCell align="right">Last Updated</TableCell>
        <TableCell align="right"/>
        </TableRow>
    </TableHead>
);
