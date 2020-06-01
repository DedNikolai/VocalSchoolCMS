import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {createLesson} from "../../../store/actions/lesson";
import {getAllTeachers} from "../../../store/actions/teacher";
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
import './CreateLesson.scss';
import {colors} from '../../../constants/view';
import Disciplines from '../../../constants/disciplines';
import Classes from '../../../constants/classes';
import LessonTypes from '../../../constants/lesson-types';
import Days from '../../../constants/days';
import ua from "../../../languages/ua";


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

const validate = values => {
    const {noDay, noTime, noDisciplines, noRoom, noType, noTeacher} = ua.pages.manageUsers.errors;
    const errors = {};

    if (!values.day) {
        errors.day = noDay;
    }

    if (!values.timeHour) {
        errors.timeHour = noTime;
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

function CreateLesson(props) {
    const classes = useStyles();
    const {createLesson, student, allTeachersLoading, getTeachers, allTeachers, closeForm} = props;
    const id = props.match ? props.match.params.id : null;
    const theme = useTheme();
    const [changed, setChanged] = useState(false);

    const formik = useFormik({
        initialValues: {
            student: {...student},
            time: '09:00'
        },
        validate,
        onSubmit: value => {
            createLesson(value);
            closeForm();
            setChanged(true);
        },
    });

    useEffect(() => {
        getTeachers();
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
        if (event.target.value === 'MAN') {
            formik.setFieldValue('duration', 60)
        } else {
            formik.setFieldValue('duration', 60)
        }
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

    if (allTeachersLoading) {
        return <div className="wrapper"><Preloader/></div>
    }

    const checkedTeacher = formik.values.teacher || {};
    // const price = formik.values.teacher && formik.values.discipline && formik.values.type ? formik.values.teacher.prices.filter(price => {
    //     return (
    //         price.discipline === formik.values.discipline && price.type === formik.values.type
    //     )
    // })[0].priceValue : '';
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
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.teacher && formik.errors.teacher || 'Вчитель'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teacher'
                            onChange={handleChangeTeacher}
                            input={<Input />}
                            renderValue={selected => selected.firstName + ' ' + selected.lastName}
                            onBlur={formik.handleBlur}
                            error={formik.touched.teacher && formik.errors.teacher}
                            MenuProps={MenuProps}
                        >
                            {allTeachers.map(teacher => (
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
                            renderValue={selected => selected}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && formik.errors.type}
                            MenuProps={MenuProps}
                        >
                            {LessonTypes.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.type === item}/>
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.day && formik.errors.day || 'День'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='day'
                            onChange={handleChangeDay}
                            input={<Input />}
                            renderValue={selected => selected}
                            MenuProps={MenuProps}
                            onBlur={formik.handleBlur}
                            error={formik.touched.day && formik.errors.day}
                        >
                            {Days.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.day === item}/>
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="time"
                        label={formik.touched.time && formik.errors.time || 'Час'}
                        type="time"
                        className={classes.textField}
                        defaultValue={formik.values.time}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 900, // 5 min
                        }}
                        onChange={handleChangeTime}
                        onBlur={formik.handleBlur}
                        error={formik.touched.time && formik.errors.time}
                    />
                    <TextField
                        label="Тривалість заняття хв"
                        name='duration'
                        id="outlined-size-small"
                        value={formik.values.duration || ''}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.discipline && formik.errors.discipline || 'Дисципліни'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='discipline'
                            onChange={handleChangeDiscipline}
                            input={<Input />}
                            renderValue={selected => selected}
                            onBlur={formik.handleBlur}
                            error={formik.touched.disciplines && formik.errors.disciplines}
                            MenuProps={MenuProps}
                        >
                            {Disciplines.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.discipline === item}/>
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            renderValue={selected => selected}
                            onBlur={formik.handleBlur}
                            error={formik.touched.roоm && formik.errors.room}
                            MenuProps={MenuProps}
                        >
                            {Classes.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.room === item} />
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {/*<div>*/}
                    {/*<TextField*/}
                        {/*label="Ціна"*/}
                        {/*name='price'*/}
                        {/*id="outlined-size-small"*/}
                        {/*value={price}*/}
                        {/*variant="outlined"*/}
                        {/*size="small"*/}
                        {/*disabled*/}
                    {/*/>*/}
                {/*</div>*/}
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

CreateLesson.propTypes = {
    createLesson: PropTypes.func.isRequired,
    allTeachersLoading: PropTypes.bool.isRequired,
    allTeachers: PropTypes.array,
    getTeachers: PropTypes.func.isRequired,
};

CreateLesson.defaultProps = {
    allTeachers: [],
}

const mapStateToProps = ({lesson, teacher}) => {
    return {
        allTeachers: teacher.teachers,
        allTeachersLoading: teacher.teachersLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    createLesson: data => dispatch(createLesson(data)),
    getTeachers: () => dispatch(getAllTeachers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateLesson);