import React, {useState, useContext, useEffect} from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import {toast} from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from "../context/auth/AuthContext";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spinner: {
        height: '50px',
        width: 'inherit',
        display: 'grid',
        placeItems: 'center'
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [waiting, setWaiting] = useState(false);
    const authContext = useContext(AuthContext) as AuthStateType;

    const {login, error, clearErrors, isAuthenticated} = authContext;


    useEffect(() => {
        if (error) {
            setWaiting(false);
            toast.error(error);
            clearErrors();
        }

        if (isAuthenticated) {
            history.push('/')
        }

        //eslint-disable-next-line
    }, [isAuthenticated, error]);


    const onSubmit = async (e) => {
        e.preventDefault();
        setWaiting(true);
        if (!email || !password) {
            toast.error('Please input all fields')
            setWaiting(false)
        } else {
            await login(email, password);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    {waiting ? (
                        <div className={classes.spinner}>
                            <CircularProgress m="auto"/>
                        </div>
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            Sign In
                        </Button>
                    )}
                    <Grid container>
                        <Grid item>
                            <Link component={NavLink} to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}