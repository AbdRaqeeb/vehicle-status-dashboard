import React, {useContext, useEffect, useState} from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from "../context/auth/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import {toast} from "react-toastify";

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
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

export default function SignUp() {
    const classes = useStyles();

    const history = useHistory();

    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [waiting, setWaiting] = useState(false);
    const authContext = useContext(AuthContext) as AuthStateType;

    const {error, clearErrors, register, isAuthenticated} = authContext;


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
        if (!email || !password || !first_name || !last_name) {
            toast.error('Please input all fields')
            setWaiting(false)
        } else {
            await register(email, password, first_name, last_name);
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
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="first_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={first_name}
                                onChange={(event) => {
                                    setFirstName(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="last_name"
                                autoComplete="lname"
                                value={last_name}
                                onChange={(event) => {
                                    setLastName(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                    </Grid>
                    {waiting ? (
                        <div className={classes.spinner}>
                            <CircularProgress/>
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
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2" component={NavLink}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}