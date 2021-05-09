import {
    GET_VEHICLE,
    GET_VEHICLES,
    VEHICLE_ERROR,
    CLEAR_ERRORS, SET_LOADING,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };

        case GET_VEHICLE:
            return {
                ...state,
                vehicles: action.payload || [],
                loading: false,
            };

        case GET_VEHICLES:
            return {
                ...state,
                vehicles: action.payload || [],
                loading: false,
            };

        case VEHICLE_ERROR:
            return {
                ...state,
                error: action.payload,
                vehicles: [],
                loading: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};