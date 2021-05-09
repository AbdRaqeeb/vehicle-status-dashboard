import React, {useReducer} from 'react';
import axios from 'axios';
import VehicleContext from './VehicleContext';
import {
    GET_VEHICLE,
    GET_VEHICLES,
    VEHICLE_ERROR,
    CLEAR_ERRORS,
    SET_LOADING,
} from '../types';
import vehicleReducer from "./vehicleReducer";

interface Response {
    data: `Record<string, unknown>`;
    errors: {
        message: string;
        extensions: `Record<string, unknown>`;
        path: [];
    }[]
}

const VehicleState = (props: any) => {
    const initialState = {
        vehicles: [],
        loading: false,
        error: null,
    };
    const [state, dispatch] = useReducer(vehicleReducer, initialState);

    const setLoading = () => {
        dispatch({
            type: SET_LOADING,
        })
    };

    // Register User
    const getVehicle = async (bike_id: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        setLoading()
        try {
            const body = {
                query: `
                    query Vehicle($bike_id: String!) {
                        vehicle(bike_id: $bike_id) {
                            bike_id
                            lat
                            lon
                            is_reserved
                            is_disabled
                            vehicle_type
                        }
                    }
                `,
                variables: {
                    bike_id,
                }
            };

            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, body, config);

            const res: Response = data;

            if (res.data) {
                await dispatch({
                    type: GET_VEHICLE,
                    payload: data.data.vehicle,
                })
            }

            if (res.errors) {
                dispatch({
                    type: VEHICLE_ERROR,
                    payload: res.errors[0].message,
                });
            }
        } catch (err) {
            dispatch({
                type: VEHICLE_ERROR,
                payload: err.message ? err : err.response.data.message,
            });
        }
    };

    // Login User
    const getVehicles = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        setLoading();
        try {
            const body = {
                query: `
                    query {
                          vehicle {
                            bike_id
                            lat
                            lon
                            is_reserved
                            is_disabled
                            vehicle_type
                          }
                        }
                `,
                variables: {},
            };

            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}`, body, config);

            const res: Response = data;

            if (res.data) {
                await dispatch({
                    type: GET_VEHICLES,
                    payload: data.data.vehicle,
                })
            }

            if (res.errors) {
                dispatch({
                    type: VEHICLE_ERROR,
                    payload: res.errors[0].message,
                });
            }

        } catch (err) {
            dispatch({
                type: VEHICLE_ERROR,
                payload: err.message ? err : err.response.data.message,
            });
        }
    };


    // Clear Errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    return (
        <VehicleContext.Provider
            value={{
                loading: state.loading,
                vehicles: state.vehicles,
                error: state.error,
                getVehicle,
                getVehicles,
                clearErrors,
                setLoading,
            }}
        >
            {props.children}
        </VehicleContext.Provider>
    );
};

export default VehicleState;