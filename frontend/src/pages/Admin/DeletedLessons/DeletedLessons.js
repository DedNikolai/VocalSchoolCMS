import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
import {getAllLessons, deleteLesson} from "../../../store/actions/deletedLesson";
import Preloader from '../../../components/Preloader/index';
import {colors, rowsPerPage} from '../../../constants/view';
import SearchIcon from '@material-ui/icons/Search';
import {NavLink} from 'react-router-dom'
import './DeletedLessons.scss'

const columns = [
    { id: 'date', label: 'Дата', minWidth: 150, align: 'center' },
    { id: 'time', label: 'Час', minWidth: 150, align: 'center' },
    { id: 'student', label: 'Учень', minWidth: 150, align: 'center' },
    { id: 'teacher', label: 'Вчитель', minWidth: 150, align: 'center' },
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

function DeletedLessons(props) {
    const classes = useStyles();
    const {lessons, lessonsLoading, getLessons, deletelessonById} = props;
    const {content = [], totalElements, number} = lessons;

    const handleChangePage = (event, page) => {
        getLessons(page, rowsPerPage);
    };

    useEffect(() => {
        getLessons(0, rowsPerPage);
    }, []);
    return (
        <div className='lessons-list'>
            {
                lessonsLoading ?
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
                                                            <TableCell className={classes.cell} key={row.id}>
                                                                <IconButton onClick={() => deletelessonById(row.id, 0, rowsPerPage)}>
                                                                    <DeleteOutline/>
                                                                </IconButton>
                                                                <NavLink to={`/admin/deleted-lessons/${row.id}`} className='main-menu__item'>
                                                                    <IconButton>
                                                                        <SearchIcon/>
                                                                    </IconButton>
                                                                </NavLink>
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
                                                    if (column.id === 'student') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.student.firstName + ' ' + row.student.lastName}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'date') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.lessonDate}
                                                            </TableCell>
                                                        )
                                                    }
                                                    if (column.id === 'time') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                {row.lessonTime}
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
    )
}

DeletedLessons.defaultProps = {
    lessons: {},
};

const mapStateToProps = ({deletedLessons}) => {
    return {
        lessons: deletedLessons.lessons,
        lessonsLoading: deletedLessons.lessonsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getLessons: (page, size) => dispatch(getAllLessons(page, size)),
    deletelessonById: (id, page, size) => dispatch(deleteLesson(id, page, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletedLessons);