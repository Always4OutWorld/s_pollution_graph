import { combineReducers } from 'redux';
import { get } from 'lodash';
import {
    FETCH_ALL_CITIES, FETCH_ALL_MEASUREMENT
} from './actionType';

const processedCities = (state = {}, action) => {
    if (action.type === FETCH_ALL_CITIES) {
        const data = get(action, 'value.data');
        if (data) {
            return Object.assign({}, state, {
                ...action.value,
                data,
            })
        }
        return Object.assign({}, action.value);
    }
    return state;
}

const processedGraph = (state = {}, action) => {
    if (action.type === FETCH_ALL_MEASUREMENT) {
        const data = get(action, 'value.data');
        if (data) {
            return Object.assign({}, state, {
                ...action.value,
                data,
            })
        }
        return Object.assign({}, action.value);
    }
    return state;
}

const reducers = combineReducers({
    citie: processedCities,
    graph: processedGraph
});

export default reducers;