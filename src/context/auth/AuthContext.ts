import * as React from 'react';

interface AuthStateContext {
    token: string;
    isAuthenticated: boolean;
    loading: boolean;
    user?: User;
    error: string;
    register: (email: string, password: string, first_name: string, last_name: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearErrors: () => void;
    setLoading: () => void;
}

const authContext = React.createContext<AuthStateContext | null>(null);

export default authContext;