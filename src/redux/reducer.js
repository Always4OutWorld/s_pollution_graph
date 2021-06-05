import { combineReducers } from 'redux';

const processedData = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TEST': 
            return {...state};
        default: return state
    }
}

const reducers = combineReducers({
    data: processedData
});

export default reducers;