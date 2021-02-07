import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    table: {
        width: 300,
    },
});

export default function StudentBalance(props) {
    const classes = useStyles();
    const {rows = []} = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Дисципліна</TableCell>
                        <TableCell align="center">Загальна</TableCell>
                        <TableCell align="center">Використані</TableCell>
                        <TableCell align="center">Перенесених</TableCell>
                        <TableCell align="center">Відмінені</TableCell>
                        <TableCell align="center">Дії</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.discipline}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.confirmedLessons.length}</TableCell>
                            <TableCell align="right">{row.transferLessons.length}</TableCell>
                            <TableCell align="right">{row.deletedLessons.length}</TableCell>
                            <TableCell align="right">
                                <IconButton>
                                    <NavLink to={`/admin/abonements/edit/${row.id}`}>
                                        <Edit/>
                                    </NavLink>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
