interface User {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

interface vehicle {
    bike_id: string;
    lat: number;
    lon: number;
    is_reserved: number;
    is_disabled: number;
    vehicle_type: string;
}

type AuthStateType = {
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
};

type VehicleStateType = {
    vehicles: vehicle[] | [];
    loading: boolean;
    error: string;
    getVehicle: (bike_id: string) => Promise<void>;
    getVehicles: () => Promise<void>;
    clearErrors: () => void;
    setLoading: () => void;
}