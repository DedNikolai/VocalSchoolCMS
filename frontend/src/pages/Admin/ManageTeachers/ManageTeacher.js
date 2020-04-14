import React, {Fragment, useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {getTeacherById, updateTeacher, createTeacher} from "../../../store/actions/teacher";
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
import './ManageTeacher.scss';
import {colors} from '../../../constants/view';
import Disciplines from '../../../constants/disciplines';
import TimeTable from '../../../components/TimeTable/TimeTable';
import TeacherFreeTimes from './TeacherFreeTimes/TeacherFreeTimes';

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

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function ManageTeacher(props) {
    const classes = useStyles();
    const {teacher, teacherLoading, getTeacher, updateTeacher, createTeacher} = props;
    const id = props.match.params.id
    const theme = useTheme();
    const [changed, setChanged] = useState(false);

    const formik = useFormik({
        initialValues: {},
        onSubmit: value => {
            const data = {...teacher};
            Object.keys(value).forEach(key => data[key] = value[key]);
            if (id) {
                updateTeacher(id, data);
            } else {
                createTeacher(value);
            }
            setChanged(true)
        },
    });

    useEffect(() => {
        if (id) {
            getTeacher(id);
        }
    }, []);

    const handleChange = event => {
        formik.setFieldValue('disciplines', event.target.value);
    };

    if (changed) {
        return <Redirect to='/admin/teachers' />
    }
    if (teacherLoading && id) {
        return <div className="wrapper"><Preloader/></div>
    }

    const teacherDesciplines = id ? Disciplines.filter(discpline => teacher.disciplines.some(item => item === discpline)) : [];
    const checked = id ? formik.values.disciplines || teacher.disciplines : formik.values.disciplines || [];
    return (
        <Fragment>
            <h2>Особисті дані</h2>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            label="Ім'я"
                            name='firstName'
                            id="outlined-size-small"
                            defaultValue={id ? teacher.firstName : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            label="Прізвище"
                            name='lastName'
                            id="outlined-size-small"
                            defaultValue={id ? teacher.lastName : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            label="Вік"
                            name='age'
                            id="outlined-size-small"
                            defaultValue={id ? teacher.age : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Email"
                            name='email'
                            id="outlined-size-small"
                            defaultValue={id ? teacher.email : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            label="Телефон"
                            name='phone'
                            id="outlined-size-small"
                            defaultValue={id ? teacher.phone : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">Дисципліни</InputLabel>
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
            <TeacherFreeTimes teacher={teacher}/>
        </Fragment>
    )
}

ManageTeacher.propTypes = {
    teacher: PropTypes.object,
    teacherLoading: PropTypes.bool.isRequired,
    getTeacher: PropTypes.func.isRequired,
    createTeacher: PropTypes.func.isRequired,
    updateTeacher: PropTypes.func.isRequired,
    getTeacherFreeTimes: PropTypes.func.isRequired,
};

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