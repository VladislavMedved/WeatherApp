// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios, { AxiosResponse } from "axios";
import { Autocomplete, AutocompleteInputChangeReason } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { values } from 'mobx';
import { ICityWeatherResponse, weatherStore } from '../weatherStore';

interface CountryType {
  name: string;
}

const GOOGLE_API_KEY = 'AIzaSyD_RkPfxtUD97ij32siaGoKeh3SACqyBW8';

export const Asynchronous = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<CountryType[]>([]);
    const [loading, setLoading] = React.useState(false);

    const predictCities = async (input: string) => {
        setLoading(true);

        const response= await axios({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&language=en_GB&key=${GOOGLE_API_KEY}`,
            responseType: 'json',
            headers: {'Access-Control-Allow-Origin': '*', // * или ваш домен
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'},
        });
        setOptions( response.data.predictions );
        setLoading(false);
    };

    const onInputChange = (e: React.ChangeEvent<{}>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (value && value.length >= 3) {
            predictCities(value);
        }
    }

    React.useEffect(() => {
        if (!open) {
        setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            onChange={(e) => {e.preventDefault()}}
            onInputChange={onInputChange}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="City"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                />
            )}
        />
  );
}
