import axios from 'axios';
import { get } from 'lodash';
import {
    FETCH_ALL_CITIES,
    FETCH_ALL_MEASUREMENT
} from './actionType';

const axiosRequest = async (url = '', params = {}) => {
    const options = {
        method: 'get',
        url: `${process.env.REACT_APP_OPENAQ}${url}`,
        params: params
      };
    const data = await axios(options);
    return data;
}

const dispatchAllActions = (
    type,
    key,
    dispatch,
    inProgress = true,
    data = null,
    error = null
  ) => {
    dispatch({
      type,
      key,
      value: {
        inProgress,
        data,
      },
    });
};

const getAllCitiesList = () => async dispatch => {
    dispatchAllActions(FETCH_ALL_CITIES, 'cities', dispatch);
    try {
        const data = await axiosRequest('/v2/cities/', { limit: 1000 });
        if (data.status === 200) {
            dispatchAllActions(FETCH_ALL_CITIES, 'cities', dispatch, false, get(data, 'data.results'));
        } else {
            dispatchAllActions(FETCH_ALL_CITIES, 'cities', dispatch, false, data);
        }
        return data;
    } catch (er) {
        dispatchAllActions(FETCH_ALL_CITIES, 'cities', dispatch, false, null, er);
        return er;
    }
}

const getMeasurement = (params = {}) => async dispatch => {
    dispatchAllActions(FETCH_ALL_MEASUREMENT, 'measurements', dispatch);
    try {
        const data = await axiosRequest('/v2/measurements', params);
        if (data.status === 200) {
            dispatchAllActions(FETCH_ALL_MEASUREMENT, 'measurements', dispatch, false, get(data, 'data.results'));
        } else {
            dispatchAllActions(FETCH_ALL_MEASUREMENT, 'measurements', dispatch, false, data);
        }
        return data;
    } catch (er) {
        dispatchAllActions(FETCH_ALL_MEASUREMENT, 'measurements', dispatch, false, null, er);
        return er;
    }
}

export {
    getAllCitiesList,
    getMeasurement
}