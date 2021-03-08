import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import {getConfirmedLesson, payAllLessons, payLesson} from "../../../../store/actions/teacher";
import Preloader from '../../../../components/Preloader/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {green} from '@material-ui/core/colors';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddButton from  '../../../../components/TableButtons/AddButton/AddButton';


const columns = [
    { id: 'date', label: 'Дата', minWidth: 150, align: 'center' },
    { id: 'student', label: 'Учень', minWidth: 150, align: 'center' },
    { id: 'price', label: 'Вартість', minWidth: 50, align: 'center' },
    { id: 'paid', label: 'Виплата', minWidth: 50, align: 'center' },
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

    cellRight: {
        padding: '2px',
        textAlign: 'right'
    },

    headCell: {
        backgroundColor: '#fff',
        fontWeight: 'bold'
    },

    confirmContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px'
    }
});

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

function TeachersConfirmedLessons(props) {
    const classes = useStyles();
    const {lessons, lessonsLoading, getLessons,
        teacherId, payAllTeachersLessons, payTeacherLesson} = props;

    useEffect(() => {
        getLessons(teacherId);
    }, []);

    const payNonPaidLessons = () => {
        payAllTeachersLessons(teacherId);
    };

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
                                    {lessons.map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map(column => {
                                                    const value = row[column.id];
                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell className={classes.cell} key={column.id}>
                                                                <IconButton onClick={() => payTeacherLesson(row.id, teacherId)}>
                                                                    <CheckBoxIcon/>
                                                                </IconButton>
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
                                                    if (column.id === 'paid') {
                                                        return (
                                                            <TableCell className={classes.cellRight} key={column.id}>
                                                                <FormControlLabel
                                                                    control={<GreenCheckbox checked={row.isPaid} name="checkedG" />}
                                                                />
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
                        <div className={classes.confirmContainer}>
                            <h3>Підтвердити всі</h3>
                            <div onClick={() => payNonPaidLessons()}>
                                <AddButton/>
                            </div>
                        </div>
                    </Paper>
            }
        </div>
    )
}

TeachersConfirmedLessons.defaultProps = {
    lessons: [],
}

const mapStateToProps = ({teacher}) => {
    return {
        lessons: teacher.teachersConfirmedLessons,
        lessonsLoading: teacher.teachersConfirmedLessonsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getLessons: (id) => dispatch(getConfirmedLesson(id)),
    payAllTeachersLessons: teacherId => dispatch(payAllLessons(teacherId)),
    payTeacherLesson: (lessonId, teacherId) => dispatch(payLesson(lessonId, teacherId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeachersConfirmedLessons);