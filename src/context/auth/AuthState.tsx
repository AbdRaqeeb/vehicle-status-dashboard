import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    SET_LOADING,
} from '../types';
import authReducer from "./authReducer";

interface Response {
    data: `Record<string, unknown>`;
    errors: {
        message: string;
        extensions: `Record<string, unknown>`;
        path: [];
    }[]
}


const AuthState = (props: any) => {
    const initialState = {
        isAuthenticated: !!localStorage.getItem('token'),
        user: {},
        token: localStorage.getItem('token'),
        loading: false,
        error: null,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setLoading = () => {
        dispatch({
            type: SET_LOADING,
        })
    };

    // Register User
    const register = async (email: string, password: string, first_name: string, last_name: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        setLoading();
        try {
            const body = {
                query: `
                    mutation Register($email: String!, $password: String!, $first_name: String!, $last_name: String!) {
                        register(email: $email, password: $password, first_name: $first_name, last_name: $last_name) {
                            token 
                            user {
                                id
                                email
                                first_name
                                last_name
                                created_at
                                updated_at
                            }
                        }
                    }
                `,
                variables: {
                    email,
                    password,
                    first_name,
                    last_name,
                }
            };

            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, body, config);

            const res: Response = data;

            if (res.data) {
                await dispatch({
                    type: REGISTER_SUCCESS,
                    payload: data.data.register,
                })
            }

            if (res.errors) {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: res.errors[0].message,
                });
            }
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.message ? err : err.response.data.message,
            });
        }
    };

    // Login User
    const login = async (email: string, password: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        setLoading();
        try {
            const body = {
                query: `
                    mutation Login($email: String!, $password: String!) {
                        login(email: $email, password: $password) {
                            token 
                            user {
                                id
                                email
                                first_name
                                last_name
                                created_at
                                updated_at
                            }
                        }
                    }
                `,
                variables: {
                    email,
                    password,
                }
            };
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}`, body, config);

            const res: Response = data;

            if (res.data) {
                await dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data.data.login,
                })
            }

            if (res.errors) {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: res.errors[0].message,
                });
            }
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.message ? err : err.response.data.message,
            });
        }
    };


    // Clear Errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    const logout = () => (dispatch({ type: LOGOUT }));

    return (
        <AuthContext.Provider
            value={{
                loading: state.loading,
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                error: state.error,
                register,
                login,
                clearErrors,
                setLoading,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;