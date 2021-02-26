import React, {Fragment, useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {createTeacher, getTeacherById, updateTeacher} from "../../../store/actions/teacher";
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
import './ManageTeacher.scss';
import {colors} from '../../../constants/view';
import Disciplines from '../../../constants/disciplines';
import TimeTable from '../../../components/TimeTable/TimeTable';
import TeacherFreeTimes from './TeacherFreeTimes/TeacherFreeTimes';
import TeacherPrices from './TeacherPrices/TeacherPrices'
import ua from "../../../languages/ua";
import TeachersConfirmedLessons from './TeachersConfirmedLessons/TeachersConfirmedLessons';

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

const validate = values => {
    const {noEmail, invalidEmail, noFirstName, noSecondName, noAge, noPhone, noDisciplines} = ua.pages.manageUsers.errors;
    const errors = {};
    if (!values.email) {
        errors.email = noEmail;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = invalidEmail;
    }

    if (!values.firstName) {
        errors.firstName = noFirstName;
    }

    if (!values.lastName) {
        errors.lastName = noSecondName;
    }

    if (!values.age) {
        errors.age = noAge;
    }

    if (!values.phone) {
        errors.phone = noPhone;
    }

    if (!values.disciplines) {
        errors.disciplines = noDisciplines;
    }

    return errors;
}

function ManageTeacher(props) {
    const classes = useStyles();
    const {teacher, teacherLoading, getTeacher, updateTeacher} = props;
    const id = props.match.params.id;
    const theme = useTheme();
    const [changed, setChanged] = useState(false);

    const formik = useFormik({
        initialValues: {...teacher},
        validate,
        onSubmit: value => {
            updateTeacher(id, value);
            setChanged(true)
        },
        enableReinitialize: true
    });

    useEffect(() => {
        getTeacher(id);
    }, []);

    const handleChange = event => {
        formik.setFieldValue('disciplines', event.target.value);
    };

    if (changed) {
        return <Redirect to='/admin/teachers' />
    }
    if (teacherLoading) {
        return <div className="wrapper"><Preloader/></div>
    }

    const teacherDesciplines = Disciplines.filter(discpline => teacher.disciplines.some(item => item === discpline));
    const checked = formik.values.disciplines || teacher.disciplines;
    return (
        <Fragment>
            <h2>Особисті дані</h2>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            label={formik.touched.firstName && formik.errors.firstName || "Ім'я"}
                            name='firstName'
                            id="outlined-size-small"
                            value={formik.values.firstName}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && formik.errors.firstName}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label={formik.touched.lastName && formik.errors.lastName || "Прізвище"}
                            name='lastName'
                            id="outlined-size-small"
                            value={formik.values.lastName}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && formik.errors.lastName}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label={formik.touched.age && formik.errors.age || "Вік"}
                            name='age'
                            id="outlined-size-small"
                            value={formik.values.age}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.age && formik.errors.age}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <TextField
                            label={formik.touched.email && formik.errors.email || "Email"}
                            name='email'
                            id="outlined-size-small"
                            value={formik.values.email}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label={formik.touched.phone && formik.errors.phone || "Телефон"}
                            name='phone'
                            id="outlined-size-small"
                            value={formik.values.phone}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.phone && formik.errors.phone}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.disciplines && formik.errors.disciplines || 'Дисципліни'}</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                name='teachers'
                                multiple
                                value={formik.values.disciplines || teacherDesciplines}
                                onChange={handleChange}
                                input={<Input />}
                                renderValue={selected => selected.map(descipline => descipline + ', ')}
                                MenuProps={MenuProps}
                                onBlur={formik.handleBlur}
                                error={formik.touched.disciplines && formik.errors.disciplines}
                            >
                                {Disciplines.map(item => (
                                    <MenuItem key={item} value={item}>
                                        <Checkbox checked={checked.indexOf(item) > -1} />
                                        <ListItemText primary={item} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='buttons-container'>
                        <NavLink to='/admin/teachers'>
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
            <h2>Особистий Розклад</h2>
            <TimeTable lessons={teacher.lessons} freeTime={teacher.workTimes}/>
            <h2>Робочі години</h2>
            <TeacherFreeTimes teacher={teacher}/>
            <h2>Ціни</h2>
            <TeacherPrices teacher={teacher}/>
            <h2>Не проплачені урокі</h2>
            <TeachersConfirmedLessons teacherId={teacher.id}/>
        </Fragment>
    )
}

ManageTeacher.defaultProps = {
    teacher: {},
}

const mapStateToProps = ({teacher}) => {
    return {
        teacher: teacher.teacherById,
        teacherLoading: teacher.teacherByIdLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getTeacher: (id) => dispatch(getTeacherById(id)),
    updateTeacher: (id, data) => dispatch(updateTeacher(id, data)),
    createTeacher: data => dispatch(createTeacher(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);