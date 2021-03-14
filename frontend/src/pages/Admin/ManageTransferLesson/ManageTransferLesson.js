import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {useFormik} from 'formik';
import './ManageTransferLesson.scss';
import {colors} from '../../../constants/view';
import Classes from '../../../constants/classes';
import ua from "../../../languages/ua";
import {getAllTeachers} from '../../../store/actions/teacher';
import {getTransferLessonById, updateTransferLesson} from '../../../store/actions/transferLessons';
import {NavLink} from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import disciplineValue from "../../../constants/disciplineValue";
import rooms from '../../../constants/rooms';
import daysValues from '../../../constants/daysValues';

const days = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SUTURDAY'];

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 500
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
        width: 100,

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

    paddingLeft: {
        paddingLeft: '10px'
    }
}));

const validate = values => {
    const {noDay, noTime, noDisciplines, noRoom, noType, noTeacher} = ua.pages.manageUsers.errors;
    const errors = {};


    if (!values.room) {
        errors.room = noRoom;
    }

    if (!values.teacher) {
        errors.teacher = noTeacher;
    }

    return errors;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function ManageTransferLesson(props) {
    const classes = useStyles();
    const {allTeachers, allTeachersLoading, getTeachers, getTransferLessonById,
        transferLesson, transferedLessonByIdLoading, changeTransferLesson} = props;
    const id = props.match.params.id;
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {...transferLesson},
        validate,
        onSubmit: value => {
            changeTransferLesson(value, id);
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        getTeachers();
        getTransferLessonById(id);
    }, []);

    const handleChangeTeacher = event => {
        formik.setFieldValue('teacher', event.target.value);
    };

    const handleChangeRoom = event => {
        formik.setFieldValue('room', event.target.value);
    };

    const handleChangeTime = event => {
        formik.setFieldValue('transferTime', event.target.value);
    };

    const handleChangeDate = event => {
        formik.setFieldValue('transferDate', event.target.value);
        const day = new Date(event.target.value);
        formik.setFieldValue('day', days[day.getDay() - 1]);
    };

    if (allTeachersLoading || transferedLessonByIdLoading) {
        return <Preloader/>
    }

    const handleChangeStatus = (event) => {
        formik.setFieldValue('status', event.target.checked ? 'DELETED' : null);
        formik.setFieldValue('isActive', !event.target.checked);
    };

    const selectedTeacher = allTeachers.filter(teacher => formik.values.teacher.id === teacher.id)[0];
    const selectedClass = Classes.filter(room => formik.values.room === room)[0];
    const isDeleted = formik.values.status === 'DELETED';

    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Учень"
                        name='student'
                        id="outlined-size-small"
                        value={formik.values.lesson.student.firstName + ' ' + formik.values.lesson.student.lastName}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="Дисципліна"
                        name='student'
                        id="outlined-size-small"
                        value={disciplineValue[formik.values.lesson.discipline]}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.teacher && formik.errors.teacher || 'Вчитель'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teacher'
                            onChange={handleChangeTeacher}
                            value={formik.values.teacher || selectedTeacher}
                            input={<Input />}
                            renderValue={selected => selected.firstName + ' ' + selected.lastName}
                            onBlur={formik.handleBlur}
                            error={formik.touched.teacher && formik.errors.teacher}
                            MenuProps={MenuProps}
                        >
                            {allTeachers.map(teacher => (
                                <MenuItem key={teacher.id} value={teacher}>
                                    <Checkbox checked={selectedTeacher.id === teacher.id}/>
                                    <ListItemText primary={teacher.firstName + ' ' + teacher.lastName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="date"
                        label="Початкова дата заняття"
                        type="date"
                        value={formik.values.lessonDate.slice(0, 10)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        id="date"
                        label="Дата Переносу заняття"
                        type="date"
                        value={formik.values.transferDate.slice(0, 10)}
                        className={classes.textField}
                        onChange={handleChangeDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="time"
                        label={formik.touched.transferTime && formik.errors.transferTime || 'Час'}
                        type="time"
                        className={classes.textField}
                        value={formik.values.transferTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 900, // 5 min
                        }}
                        onChange={handleChangeTime}
                        onBlur={formik.handleBlur}
                        error={formik.touched.transferTime && formik.errors.transferTime}
                    />
                </div>
                <div>
                    <TextField
                        id="day"
                        label="День переносу"
                        type="text"
                        value={daysValues[formik.values.day]}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.room && formik.errors.room || 'Клас'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='room'
                            onChange={handleChangeRoom}
                            input={<Input />}
                            renderValue={selected => rooms[selected]}
                            value={formik.values.room || selectedClass}
                            onBlur={formik.handleBlur}
                            error={formik.touched.roоm && formik.errors.room}
                            MenuProps={MenuProps}
                        >
                            {Classes.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.room === item} />
                                    <ListItemText primary={rooms[item] } />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.paddingLeft}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isDeleted}
                                onChange={handleChangeStatus}
                                name="status"
                            />
                        }
                        label="Відмінений"
                    />
                </div>
                <div className='buttons-container'>
                    <NavLink to='/admin' className='main-menu__item'>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            style={{backgroundColor: colors.secondaryColor}}
                        >
                            Cancel
                        </Button>
                    </NavLink>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            style={{backgroundColor: colors.COLOR_GREEN}}
                            type='submit'
                        >
                            Save
                        </Button>
                    </ThemeProvider>
                </div>
            </form>
        </Paper>
    )
}

ManageTransferLesson.propTypes = {
    getTransferLessonById: PropTypes.func.isRequired,
    changeTransferLesson: PropTypes.func.isRequired,
    allTeachersLoading: PropTypes.bool.isRequired,
    transferedLessonByIdLoading: PropTypes.bool.isRequired,
    allTeachers: PropTypes.array,
    transferLesson: PropTypes.object,
    getTeachers: PropTypes.func.isRequired,
};

ManageTransferLesson.defaultProps = {
    allTeachers: [],
    transferLesson: {}
}

const mapStateToProps = ({lesson, teacher, transferLessons}) => {
    return {
        allTeachers: teacher.teachers,
        allTeachersLoading: teacher.teachersLoading,
        transferLesson: transferLessons.transferedLessonById,
        transferedLessonByIdLoading: transferLessons.transferedLessonByIdLoading
    }
};

const mapDispatchToProps = dispatch => ({
    getTransferLessonById: (id) => dispatch(getTransferLessonById(id)),
    getTeachers: () => dispatch(getAllTeachers()),
    changeTransferLesson: (data, id) => dispatch(updateTransferLesson(data, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTransferLesson);