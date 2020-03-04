import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {getStudentById, updateStudent, createStudent} from "../../../store/actions/student";
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
import './ManageStudent.scss';
import {colors} from '../../../constants/view';

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

function ManageStudent(props) {
    const classes = useStyles();
    const {student, studentLoading, getStudent, allTeachers, allTeachersLoading,
        getTeachers, updateStudent, createStudent} = props;
    const id = props.match.params.id
    const theme = useTheme();
    const [changed, setChanged] = useState(false);

    const formik = useFormik({
        initialValues: {},
        onSubmit: value => {
            const data = {...student};
            Object.keys(value).forEach(key => data[key] = value[key]);
            if (id) {
                updateStudent(id, data);
            } else {
                createStudent(value);
            }
            setChanged(true)
        },
    });

    useEffect(() => {
        getTeachers();
        if (id) {
            getStudent(id);
        }
    }, []);

    const handleChange = event => {
        formik.setFieldValue('teachers', event.target.value);
    };

    if (changed) {
        return <Redirect to='/admin/students' />
    }

    if (allTeachersLoading || studentLoading && id) {
        return <div className="wrapper"><Preloader/></div>
    }

    const studentTeachers = id ? allTeachers.filter(teacher => student.teachers.some(item => item.id === teacher.id)) : [];
    const checked = id ? formik.values.teachers || student.teachers : formik.values.teachers || [];
    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Ім'я"
                        name='firstName'
                        id="outlined-size-small"
                        defaultValue={id ? student.firstName : ''}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                    />
                    <TextField
                        label="Прізвище"
                        name='lastName'
                        id="outlined-size-small"
                        defaultValue={id ? student.lastName : ''}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                    />
                    <TextField
                        label="Вік"
                        name='age'
                        id="outlined-size-small"
                        defaultValue={id ? student.age : ''}
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
                        defaultValue={id ? student.email : ''}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                    />
                    <TextField
                        label="Телефон"
                        name='phone'
                        id="outlined-size-small"
                        defaultValue={id ? student.phone : ''}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Баланс"
                        name='payBalance'
                        id="outlined-size-small"
                        defaultValue={id ? student.payBalance : ''}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Викладачі</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teachers'
                            multiple
                            value={formik.values.teachers || studentTeachers}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={selected => selected.map(teacher => teacher.firstName + ' ' + teacher.lastName).join(', ')}
                            MenuProps={MenuProps}
                        >
                            {allTeachers.map(teacher => (
                                <MenuItem key={teacher.id} value={teacher}>
                                    <Checkbox checked={checked.map(teacher => teacher.id).indexOf(teacher.id) > -1} />
                                    <ListItemText primary={teacher.firstName + ' ' + teacher.lastName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='buttons-container'>
                    <NavLink to='/admin/students'>
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
    )
}

ManageStudent.propTypes = {
    student: PropTypes.object,
    studentLoading: PropTypes.bool.isRequired,
    allTeachersLoading: PropTypes.bool.isRequired,
    getStudent: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    allTeachers: PropTypes.array,
};

ManageStudent.defaultProps = {
    student: null,
    allTeachers: [],
}

const mapStateToProps = ({student, teacher}) => {
    return {
        student: student.studentById,
        studentLoading: student.studentByIdLoading,
        allTeachers: teacher.teachers,
        allTeachersLoading: teacher.teachersLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getStudent: (id) => dispatch(getStudentById(id)),
    getTeachers: () => dispatch(getAllTeachers()),
    updateStudent: (id, data) => dispatch(updateStudent(id, data)),
    createStudent: data => dispatch(createStudent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);