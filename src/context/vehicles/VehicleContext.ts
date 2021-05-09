import * as React from 'react';

type VehicleStateContext = {
    vehicles: vehicle[];
    loading: boolean;
    error: string;
    getVehicle: (bike_id: string) => Promise<void>;
    getVehicles: () => Promise<void>;
    clearErrors: () => void;
    setLoading: () => void;
}

const VehicleContext = React.createContext<VehicleStateContext | null>(null);

export default VehicleContext;