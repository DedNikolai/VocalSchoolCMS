import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {getLessonById, updateLesson, createLesson} from "../../../store/actions/lesson";
import {getAllTeachers} from "../../../store/actions/teacher";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, useTheme, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
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
import { green } from '@material-ui/core/colors';
import {useFormik} from 'formik';
import './ManageLesson.scss';
import {colors} from '../../../constants/view';
import Disciplines from '../../../constants/disciplines';
import Classes from '../../../constants/classes';
import LessonTypes from '../../../constants/lesson-types';
import Days from '../../../constants/days';

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
}));

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

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function ManageLessons(props) {
    const classes = useStyles();
    const {lesson, lessonLoading, getLesson, updateLesson, createLesson,
        student, allTeachersLoading, getTeachers, allTeachers, closeForm} = props;
    const id = props.match ? props.match.params.id : null;
    const theme = useTheme();
    const [changed, setChanged] = useState(false);

    const formik = useFormik({
        initialValues: {
            student: {...student}
        },
        onSubmit: value => {
            const data = {...lesson};
            Object.keys(value).forEach(key => data[key] = value[key]);
            if (id) {
                data.student = {...lesson.student};
                updateLesson(id, data);
            } else {
                createLesson(value);
            }
            closeForm();
            setChanged(true);
        },
    });

    useEffect(() => {
        getTeachers();
        if (id) {
            getLesson(id);
        }
    }, []);

    const handleChangeDiscipline = event => {
        formik.setFieldValue('discipline', event.target.value);
    };

    const handleChangeTeacher = event => {
        formik.setFieldValue('teacher', event.target.value);
    };

    const handleChangeRoom = event => {
        formik.setFieldValue('room', event.target.value);
    };

    const handleChangeType = event => {
        formik.setFieldValue('type', event.target.value);
    };

    const handleChangeDay = event => {
        formik.setFieldValue('day', event.target.value);
    };

    const handleChangeTime = event => {
        const hour = +event.target.value.split(':')[0];
        const minutes = +event.target.value.split(':')[1];
        formik.setFieldValue('timeHour', hour);
        formik.setFieldValue('timeMinutes', minutes);
    };

    if (changed && !student) {
        return <Redirect to='/admin/lessons' />
    }
    if (allTeachersLoading || lessonLoading && id) {
        return <div className="wrapper"><Preloader/></div>
    }

    const selectedDescipline = id ? Disciplines.filter(discpline => lesson.discipline === discpline)[0] : '';
    const checkedDiscipline = id ? formik.values.discipline || lesson.discipline : formik.values.discipline || '';
    const selectedTeacher = id ? allTeachers.filter(teacher => lesson.teacher.id === teacher.id)[0] : null;
    const checkedTeacher = id ? formik.values.teacher || lesson.teacher : formik.values.teacher || {};
    const selectedClass = id ? Classes.filter(room => lesson.room === room)[0] : '';
    const checkedClass = id ? formik.values.room || lesson.room : formik.values.room || '';
    const selectedLessonType = id ? LessonTypes.filter(item => lesson.type === item)[0] : '';
    const checkedLessonType = id ? formik.values.type || lesson.type : formik.values.type || '';
    const selectedDay = id ? Days.filter(item => lesson.day === item)[0] : '';
    const checkedDay = id ? formik.values.day || lesson.day : formik.values.day || '';
    const defaultTime = id ? `${lesson.timeHour}:${lesson.timeMinutes ? lesson.timeMinutes : lesson.timeMinutes + '0'}` : '09:00';

    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Учень"
                        name='student'
                        id="outlined-size-small"
                        value={student ? student.firstName + ' ' + student.lastName : id ? lesson.student.firstName + ' ' + lesson.student.lastName : ''}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">День</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='day'
                            value={formik.values.day || selectedDay}
                            onChange={handleChangeDay}
                            input={<Input />}
                            renderValue={selected => selected}
                            MenuProps={MenuProps}
                        >
                            {Days.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={checkedDay === item} />
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="time"
                        label="Час"
                        type="time"
                        defaultValue={defaultTime}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 900, // 5 min
                        }}
                        onChange={handleChangeTime}
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Дисципліна</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='discipline'
                            value={formik.values.discipline || selectedDescipline}
                            onChange={handleChangeDiscipline}
                            input={<Input />}
                            renderValue={selected => selected}
                            MenuProps={MenuProps}
                        >
                            {Disciplines.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={checkedDiscipline === item} />
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Класс</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='room'
                            value={formik.values.room || selectedClass}
                            onChange={handleChangeRoom}
                            input={<Input />}
                            renderValue={selected => selected}
                            MenuProps={MenuProps}
                        >
                            {Classes.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={checkedClass === item} />
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Тип Заняття</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='room'
                            value={formik.values.type || selectedLessonType}
                            onChange={handleChangeType}
                            input={<Input />}
                            renderValue={selected => selected}
                            MenuProps={MenuProps}
                        >
                            {LessonTypes.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={checkedLessonType === item} />
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Викладач</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teacher'
                            value={formik.values.teacher || selectedTeacher}
                            onChange={handleChangeTeacher}
                            input={<Input />}
                            renderValue={selected => selected.firstName + ' ' + selected.lastName}
                            MenuProps={MenuProps}
                        >
                            {allTeachers.map(teacher => (
                                <MenuItem key={teacher.id} value={teacher}>
                                    <Checkbox checked={teacher.id === checkedTeacher.id} />
                                    <ListItemText primary={teacher.firstName + ' ' + teacher.lastName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="Ціна"
                        name='price'
                        id="outlined-size-small"
                        defaultValue={''}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div className='buttons-container'>
                    {
                        id ?
                            <NavLink to='/admin/lessons'>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                >
                                    Cancel
                                </Button>
                            </NavLink>
                            :
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={closeForm}
                            >
                                Cancel
                            </Button>

                    }
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

ManageLessons.propTypes = {
    lesson: PropTypes.object,
    lessonLoading: PropTypes.bool.isRequired,
    getLesson: PropTypes.func.isRequired,
    createLesson: PropTypes.func.isRequired,
    updateLesson: PropTypes.func.isRequired,
    allTeachersLoading: PropTypes.bool.isRequired,
    allTeachers: PropTypes.array,
    getTeachers: PropTypes.func.isRequired,
};

ManageLessons.defaultProps = {
    lesson: {},
    allTeachers: [],
}

const mapStateToProps = ({lesson, teacher}) => {
    return {
        lesson: lesson.lessonById,
        lessonLoading: lesson.lessonByIdLoading,
        allTeachers: teacher.teachers,
        allTeachersLoading: teacher.teachersLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getLesson: (id) => dispatch(getLessonById(id)),
    updateLesson: (id, data) => dispatch(updateLesson(id, data)),
    createLesson: data => dispatch(createLesson(data)),
    getTeachers: () => dispatch(getAllTeachers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageLessons);