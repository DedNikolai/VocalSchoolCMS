import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {createLesson, getLessonsByDay} from "../../../store/actions/lesson";
import {getAllTeachers} from "../../../store/actions/teacher";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme, withStyles} from '@material-ui/core/styles';
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
import './CreateLesson.scss';
import {colors} from '../../../constants/view';
import Disciplines from '../../../constants/disciplines';
import ua from "../../../languages/ua";
import {green} from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'date-fns';
import disciplineValue from '../../../constants/disciplineValue';
import rooms from '../../../constants/rooms';
import daysValues from '../../../constants/daysValues';
import typesValue from '../../../constants/typesValue';
import times from '../../../constants/times';
import days from '../../../constants/days';
import roomsValues from '../../../constants/roomsValues';


const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

    disabledButton: {
       margin: theme.spacing(1),
       width: 100,
       backgroundColor: '#f2f2f2',
       cursor: 'not-allowed',
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
    const {noDay, noTime, noDisciplines, noRoom, noType, noTeacher, noDate} = ua.pages.manageUsers.errors;
    const errors = {};

    if (!values.day) {
        errors.day = noDay;
    }

    if (!values.discipline) {
        errors.discipline = noDisciplines;
    }

    if (!values.room) {
        errors.room = noRoom;
    }

    if (!values.type) {
        errors.type = noType;
    }

    if (!values.teacher) {
        errors.teacher = noTeacher;
    }

    if (!values.time) {
        errors.time = noTime;
    }

    if (!values.lessonStartDate) {
        errors.lessonStartDate = noDate;
    }

    return errors;
};

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

function CreateLesson(props) {
    const classes = useStyles();
    const {createLesson, student, allTeachersLoading, getTeachers, allTeachers, closeForm} = props;
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            student: {...student},
            isSingleLesson: false,
            lessonStartDate: '',
            day: '',
            lessonFinishDate: null,
            time: '',
            room: ''
        },
        validate,
        onSubmit: value => {
            createLesson(value);
            closeForm();
        },
    });

    useEffect(() => {
        getTeachers();
    }, []);

    const handleChangeistTest = (event) => {
        formik.setFieldValue('isSingleLesson', event.target.checked);
        if(!event.target.checked) {
            formik.setFieldValue('lessonFinishDate', null);
        } else {
            formik.setFieldValue('lessonFinishDate', formik.values.lessonStartDate);
        }
    };

    const handleDateChange = (event) => {
        if (formik.values.isSingleLesson) {
            formik.setFieldValue('lessonFinishDate', event.target.value);
        }

        formik.setFieldValue('lessonStartDate', event.target.value);
        const day = new Date(event.target.value);
        formik.setFieldValue('day', days[day.getDay() - 1]);
    };

    const handleChangeDiscipline = event => {
        formik.setFieldValue('discipline', event.target.value);
        formik.setFieldValue('teacher', {});
        formik.setFieldValue('type', '');
    };

    const handleChangeTeacher = event => {
        formik.setFieldValue('teacher', event.target.value);
        formik.setFieldValue('type', null);
    };

    const handleChangeRoom = event => {
        formik.setFieldValue('room', event.target.value);
    };

    const handleChangeType = event => {
        formik.setFieldValue('type', event.target.value);
        if (event.target.value === 'MAN') {
            formik.setFieldValue('duration', 60)
        } else {
            formik.setFieldValue('duration', 30)
        }
    };

    const handleChangeTime = event => {
        formik.setFieldValue('time', event.target.value);
    };

    if (allTeachersLoading) {
        return <div className="wrapper"><Preloader/></div>
    }

    const checkedTeacher = formik.values.teacher || {};
    const checkedDiscipline = formik.values.discipline || '';
    const checkedType = formik.values.type || '';
    const lessonTypes = checkedTeacher.id ? checkedTeacher.prices.filter(price => price.discipline === checkedDiscipline).map(price => price.type) : [];
    const price = formik.values.teacher && formik.values.discipline && formik.values.type ? formik.values.teacher.prices.filter(price => {
        return (
            price.discipline === formik.values.discipline && price.type === formik.values.type
        )
    })[0].priceValue : '';

    const isValid = !Object.keys(formik.errors).length && Object.keys(formik.touched).length !== 0;

    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Учень"
                        name='student'
                        id="outlined-size-small"
                        value={student.firstName + ' ' + student.lastName}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div className={classes.paddingLeft}>
                    <FormControlLabel
                        control={<GreenCheckbox checked={formik.values.isSingleLesson} onChange={handleChangeistTest} name="isTestLesson" />}
                        label="Разовий Урок"
                    />
                </div>
                <div>
                    <TextField
                        label={formik.touched.lessonStartDate && formik.errors.lessonStartDate || 'Дата старту заняття'}
                        id="date"
                        type="date"
                        value={formik.values.lessonStartDate}
                        className={classes.textField}
                        onBlur={formik.handleBlur}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        id="day"
                        name='day'
                        label="День"
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
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.discipline && formik.errors.discipline || 'Дисципліна'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='discipline'
                            onChange={handleChangeDiscipline}
                            input={<Input />}
                            renderValue={() => disciplineValue[checkedDiscipline]}
                            value={checkedDiscipline}
                            onBlur={formik.handleBlur}
                            error={formik.touched.disciplines && formik.errors.disciplines}
                            MenuProps={MenuProps}
                        >
                            {Disciplines.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.discipline === item}/>
                                    <ListItemText primary={disciplineValue[item]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.teacher && formik.errors.teacher || 'Вчитель'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teacher'
                            onChange={handleChangeTeacher}
                            input={<Input />}
                            renderValue={() => checkedTeacher.id ? checkedTeacher.firstName + ' ' + checkedTeacher.lastName : ''}
                            value={checkedTeacher}
                            onBlur={formik.handleBlur}
                            error={formik.touched.teacher && formik.errors.teacher}
                            MenuProps={MenuProps}
                            disabled={!checkedDiscipline}
                        >
                            {allTeachers.filter(teacher => teacher.disciplines.indexOf(checkedDiscipline) !== -1).map(teacher => (
                                <MenuItem key={teacher.id} value={teacher}>
                                    <Checkbox checked={checkedTeacher.id === teacher.id}/>
                                    <ListItemText primary={teacher.firstName + ' ' + teacher.lastName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.type && formik.errors.type || 'Тип Заняття'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='type'
                            onChange={handleChangeType}
                            input={<Input />}
                            renderValue={() => typesValue[checkedType]}
                            value={checkedType}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && formik.errors.type}
                            MenuProps={MenuProps}
                            disabled={!checkedTeacher.id}
                        >
                            {lessonTypes.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.type === item}/>
                                    <ListItemText primary={typesValue[item]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.time && formik.errors.time || 'Час'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='time'
                            onChange={handleChangeTime}
                            input={<Input />}
                            renderValue={() => formik.values.time || ''}
                            value={formik.values.time}
                            MenuProps={MenuProps}
                            onBlur={formik.handleBlur}
                            error={formik.touched.time && formik.errors.time}
                        >
                            {times.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.time === item}/>
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="Тривалість заняття хв"
                        name='duration'
                        id="outlined-size-small"
                        value={formik.values.duration || ''}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                    <TextField
                        label="Ціна"
                        name='price'
                        id="outlined-size-small"
                        value={price}
                        variant="outlined"
                        size="small"
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
                            input={<Input/>}
                            renderValue={selected => rooms[selected]}
                            onBlur={formik.handleBlur}
                            error={formik.touched.roоm && formik.errors.room}
                            value={formik.values.room}
                            MenuProps={MenuProps}
                        >
                            {roomsValues.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.room === item} />
                                    <ListItemText primary={rooms[item]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='buttons-container'>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={closeForm}
                        style={{backgroundColor: colors.secondaryColor}}
                    >
                        Cancel
                    </Button>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={isValid ? classes.button : classes.disabledButton}
                            startIcon={<SaveIcon />}
                            style={{backgroundColor: isValid ? colors.COLOR_GREEN : colors.colorGrey}}
                            type='submit'
                            disabled={!isValid}
                        >
                            Save
                        </Button>
                    </ThemeProvider>
                </div>
            </form>
        </Paper>
    )
}

CreateLesson.propTypes = {
    createLesson: PropTypes.func.isRequired,
    allTeachersLoading: PropTypes.bool.isRequired,
    lessonsByDayLoading: PropTypes.bool.isRequired,
    allTeachers: PropTypes.array,
    lessonsByDay: PropTypes.array,
    getTeachers: PropTypes.func.isRequired,
    getAllLessonsByCurrentDay: PropTypes.func.isRequired,

};

CreateLesson.defaultProps = {
    allTeachers: [],
    lessonsByDay: [],
}

const mapStateToProps = ({lesson, teacher}) => {
    return {
        allTeachers: teacher.teachers,
        allTeachersLoading: teacher.teachersLoading,
        lessonsByDayLoading: lesson.lessonsByDayLoading,
        lessonsByDay: lesson.lessonsByDay,
    }
};

const mapDispatchToProps = dispatch => ({
    createLesson: data => dispatch(createLesson(data)),
    getTeachers: () => dispatch(getAllTeachers()),
    getAllLessonsByCurrentDay: day => dispatch(getLessonsByDay(day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateLesson);