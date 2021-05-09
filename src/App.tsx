import React, {useContext, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from "./utils/setAuthToken";
import VehicleState from "./context/vehicles/VehicleState";
import AuthState from "./context/auth/AuthState";
import AuthContext from './context/auth/AuthContext';
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Home from './pages/Home';

type Props = {
    children: React.ReactNode;
    path: string;
    exact: boolean;
}

const PrivateRoute = (props: Props) => {
    const { isAuthenticated } = useContext(AuthContext) as AuthStateType;

    return isAuthenticated ? (<Route path={props.path} exact={props.exact}>
            {props.children}
        </Route>)
        :
        (<Redirect to="/login"/>)
};

const App = () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }


    return (
        <AuthState>
            <VehicleState>
                <Router>
                    <Fragment>
                        <Switch>
                            <PrivateRoute path='/' exact={true}>
                                <Home/>
                            </PrivateRoute>
                            <Route exact component={SignIn} path='/login' />
                            <Route exact component={SignUp} path='/register' />
                        </Switch>
                        <ToastContainer />
                    </Fragment>
                </Router>
            </VehicleState>
        </AuthState>
    );
}

export default App;
