import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import {deleteCredit, getStudentCredits} from "../../../../store/actions/credits";
import Preloader from '../../../../components/Preloader/index';

const columns = [
    { id: 'teacher', label: 'Вчитель', minWidth: 150, align: 'center' },
    { id: 'discipline', label: 'Дисципліна', minWidth: 50, align: 'center' },
    { id: 'date', label: 'Дата заняття', minWidth: 50, align: 'center' },
    { id: 'time', label: 'Час заняття', minWidth: 50, align: 'center' },
    { id: 'actions', label: 'Дії', minWidth: 50, align: 'center' },
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

function StudentCredits(props) {
    const classes = useStyles();
    const {credits = [], studentId, creditsLoading, getCredits, deleteCreditById} = props;

    useEffect(() => {
        getCredits(studentId);
    }, []);

    return (
        <div className='students-list'>
            {
                creditsLoading ?
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
                                    {credits.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                <IconButton>
                                                                    <DeleteOutline onClick={() => deleteCreditById(row.id)}/>
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'date') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                {row.lessonDate.split('-').reverse().join('-')}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'teacher') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                {row.teacher.firstName + ' ' + row.teacher.lastName}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'discipline') {
                                                        return (
                                                            <TableCell className={classes.cell}>
                                                                {row.lesson.discipline}
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
                    </Paper>
            }
        </div>
    );
};

const mapStateToProps = ({credit}) => {
    return {
        credits: credit.studentCredits,
        creditsLoading: credit.creditsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getCredits: (id) => dispatch(getStudentCredits(id)),
    deleteCreditById: (id) => dispatch(deleteCredit(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentCredits);
