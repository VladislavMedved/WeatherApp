import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, AutocompleteInputChangeReason } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

import data from "../data/weather_14.json";
import { weatherStore } from '../stores/weatherStore';
import { IBulkCityWeather } from '../api/bulkCities';
import { weatherApi } from '../api/weatherApi';

export const Asynchronous = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<IBulkCityWeather[]>([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        weatherStore.saveCitiesForSuggestion(data as IBulkCityWeather[]);
    }, [])

    const suggestCities = async (input: string) => {
        setLoading(true);

        const suggestions = weatherStore.suggestionCities.filter(x => x.city.name.toLowerCase().indexOf(input.toLowerCase()) !== -1);
        setOptions(suggestions);

        setLoading(false);
    };

    const onInputChange = (e: React.ChangeEvent<{}>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (value && value.length >= 3) {
            suggestCities(value);
        }
    }

    const onChange =  async (
        event: React.ChangeEvent<{}>,
        value: IBulkCityWeather | null,
        reason: any,
        details?: any,
      ) => {
          if (value?.city.name) {
            var weather = await weatherApi.getCityWeather(value?.city.name);
            weatherStore.addCity(weather);
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
            onChange={onChange}
            onInputChange={onInputChange}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.city.name === value.city.name}
            getOptionLabel={(option) => option.city.name}
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
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
  );
}
