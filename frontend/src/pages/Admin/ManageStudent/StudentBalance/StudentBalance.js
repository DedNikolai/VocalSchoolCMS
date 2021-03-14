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
import disciplineValue from '../../../../constants/disciplineValue';

const useStyles = makeStyles({
    table: {

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
                        <TableCell align="center">Загальна к-ть занять</TableCell>
                        <TableCell align="center">Використані заняття</TableCell>
                        <TableCell align="center">Перенесені заняття</TableCell>
                        <TableCell align="center">Дії</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="center">
                                {disciplineValue[row.discipline]}
                            </TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.usedLessons}</TableCell>
                            <TableCell align="center">{row.transferLessons.length}</TableCell>
                            <TableCell align="center">
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
