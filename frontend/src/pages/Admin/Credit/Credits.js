import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import {deleteCredit, getAllCredits} from "../../../store/actions/credits";
import Preloader from '../../../components/Preloader/index';
import {rowsPerPage} from '../../../constants/view';
import disciplineValue from '../../../constants/disciplineValue';

const columns = [
    { id: 'student', label: 'Студент', minWidth: 150, align: 'center' },
    { id: 'teacher', label: 'Вчитель', minWidth: 150, align: 'center' },
    { id: 'discipline', label: 'Дисципліна', minWidth: 50, align: 'center' },
    { id: 'date', label: 'Дата Заняття', minWidth: 50, align: 'center' },
    { id: 'time', label: 'Час Заняття', minWidth: 50, align: 'center' },
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

function Credits(props) {
    const classes = useStyles();
    const {credits = {}, creditsLoading, getCredits, deleteCreditById} = props;
    const {content = [], totalElements = 0, number = 0} = credits;

    useEffect(() => {
        getCredits(0, rowsPerPage);
    }, []);

    const handleChangePage = (event, page) => {
        getCredits(page, rowsPerPage);
    };

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
                                    {content.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                <IconButton onClick={() => deleteCreditById(row.id, 0, rowsPerPage)}>
                                                                    <DeleteOutline />
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'date') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.lessonDate.split('-').reverse().join('-')}
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
                                                    if (column.id === 'teacher') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.teacher.firstName + ' ' + row.teacher.lastName}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'discipline') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {disciplineValue[row.lesson.discipline]}
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
};

const mapStateToProps = ({credit}) => {
    return {
        credits: credit.credits,
        creditsLoading: credit.creditsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getCredits: (page, size) => dispatch(getAllCredits(page, size)),
    deleteCreditById: (id, page, size) => dispatch(deleteCredit(id, page, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Credits);
