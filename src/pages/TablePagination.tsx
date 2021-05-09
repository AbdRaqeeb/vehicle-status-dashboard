import React, {useContext, useEffect, useState, Fragment} from 'react';
import {makeStyles, useTheme, Theme, createStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import VehicleContext from "../context/vehicles/VehicleContext";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import SearchBar from "material-ui-search-bar";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}


const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [text, setText] = useState<string>('');


    const {
        loading,
        vehicles,
        clearErrors,
        error,
        getVehicle,
        getVehicles,
    } = useContext(VehicleContext) as VehicleStateType;

    useEffect(() => {
        getVehicles()


        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors()

        }

        if (vehicles.length === 1) {
            setPage(0);
        }

        // eslint-disable-next-line
    }, [error, vehicles]);

    const onSearch = async () => {
        await getVehicle(text);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, vehicles.length - page * rowsPerPage);

    if (loading) return <Spinner/>;

    return (
        <Fragment>
            <Paper>
                <SearchBar
                    value={text}
                    onChange={(searched) => setText(searched)}
                    onRequestSearch={() => onSearch()}
                    onCancelSearch={async () => {await getVehicles(); setText('')}}
                />
            </Paper>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Vehicle Type</StyledTableCell>
                            <StyledTableCell align="right">Latitude</StyledTableCell>
                            <StyledTableCell align="right">Longitude</StyledTableCell>
                            <StyledTableCell align="right">Reserved</StyledTableCell>
                            <StyledTableCell align="right">Disabled</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? vehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : vehicles
                        ).map((row) => (
                            <StyledTableRow key={row.bike_id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.bike_id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{
                                    row.vehicle_type.charAt(0).toUpperCase() + row.vehicle_type.slice(1)
                                }</StyledTableCell>
                                <StyledTableCell align="right">{row.lat}</StyledTableCell>
                                <StyledTableCell align="right">{row.lon}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {
                                        row.is_reserved === 0 ?
                                            (<Button>NO</Button>)
                                            :
                                            (<Button color="primary">YES</Button>)
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">{
                                    row.is_disabled === 0 ?
                                        (<Button>NO</Button>)
                                        :
                                        (<Button color="primary">YES</Button>)
                                }</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <StyledTableCell align="right"/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={vehicles.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {'aria-label': 'rows per page'},
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Fragment>
    );
}
