import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {getAllAbonements, deleteAbonement} from "../../../store/actions/abonements";
import Preloader from '../../../components/Preloader/index';
import {rowsPerPage} from '../../../constants/view';
import disciplineValue from '../../../constants/disciplineValue';
import moment from 'moment';

const columns = [
    { id: 'id', label: '№', minWidth: 50, align: 'center' },
    { id: 'date', label: 'Дата', minWidth: 150, align: 'center' },
    { id: 'student', label: 'Студент', minWidth: 150, align: 'center' },
    { id: 'discipline', label: 'Дисципліна', minWidth: 50, align: 'center' },
    { id: 'price', label: 'Ціна', minWidth: 50, align: 'center' },
    { id: 'quantity', label: 'К-ть Занять', minWidth: 50, align: 'center' },
    { id: 'status', label: 'Статус', minWidth: 50, align: 'center' },
    { id: 'actions', label: 'Редагувати', minWidth: 50, align: 'center' },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#fff'
    },
    container: {
        maxHeight: 440,
    },

    cell: {
        padding: '2px',
        textAlign: 'center'
    },

    headCell: {
        backgroundColor: '#fff',
        fontWeight: 'bold'
    },
});

function Abonements(props) {
    const classes = useStyles();
    const {abonements, abonementsLoading, getAbonements, deleteById} = props;
    const {content = [], totalElements, number} = abonements;
    const [param, setParam] = useState('');

    useEffect(() => {
        getAbonements(0, rowsPerPage, param);
    }, []);

    const handleChangePage = (event, page) => {
        getAbonements(page, rowsPerPage, param);
    };
    return (
        <div className='students-list'>
            {
                abonementsLoading ?
                    <div className="wrapper"><Preloader/></div>
                    :
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map(column => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                className={classes.headCell}
                                                style={{ minWidth: column.minWidth, textAlign: column.align}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {content.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                <IconButton>
                                                                    <NavLink to={`/admin/abonements/edit/${row.id}`}>
                                                                        <Edit/>
                                                                    </NavLink>
                                                                </IconButton>
                                                                <IconButton onClick={() => deleteById(row.id, 0, rowsPerPage)}>
                                                                <DeleteOutline/>
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'date') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.createdDate.split('-').reverse().join('-')}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'student') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.student.firstName + ' ' + row.student.lastName}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'status') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.isActive ? ' ' : 'Використаний'}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'discipline') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {disciplineValue[row.discipline]}
                                                            </TableCell>
                                                        )
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[rowsPerPage]}
                            component="div"
                            count={totalElements}
                            rowsPerPage={rowsPerPage}
                            page={number}
                            onChangePage={handleChangePage}
                        />
                    </Paper>
            }
        </div>
    );
}

Abonements.propTypes = {
    abonements: PropTypes.object,
    abonementsLoading: PropTypes.bool.isRequired,
    getAbonements: PropTypes.func.isRequired,
    deleteById: PropTypes.func.isRequired,
};

Abonements.defaultProps = {
    abonements: {},
}

const mapStateToProps = ({abonement}) => {
    return {
        abonements: abonement.abonements,
        abonementsLoading: abonement.abonementsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getAbonements: (page, size, param) => dispatch(getAllAbonements(page, size, param)),
    deleteById: (id, page, size) => dispatch(deleteAbonement(id, page, size))
});

export default connect(mapStateToProps, mapDispatchToProps)(Abonements);
