import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from "../context/auth/AuthContext";
import CustomPaginationActionsTable from "./TablePagination";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        box: {
            marginTop: theme.spacing(2),
        }
    }),
);

export default function Home() {
    const classes = useStyles();
    const history = useHistory();
    const { logout } = useContext(AuthContext) as AuthStateType;

    const onLogOut = () => {
        logout();
        history.push('/login')
    };

    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Bikes
                        </Typography>
                        <Button color="inherit" onClick={() => onLogOut()}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <main className={classes.box}>
                <Container maxWidth="md">
                    <CustomPaginationActionsTable/>
                </Container>
            </main>
        </Fragment>
    )
}