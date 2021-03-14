import React, {Fragment} from 'react';
import {updateTeacher} from "../../../../store/actions/teacher";
import {connect} from "react-redux";
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
import SaveIcon from '@material-ui/icons/Save';
import {useFormik} from 'formik';
import {colors} from '../../../../constants/view';
import Disciplines from '../../../../constants/disciplines';
import ua from "../../../../languages/ua";
import disciplineValue from '../../../../constants/disciplineValue';

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

function TeacherData(props) {
    const classes = useStyles();
    const {teacher, updateTeacher, setChanged} = props;
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {...teacher},
        validate,
        onSubmit: value => {
            updateTeacher(teacher.id, value);
            setChanged(true)
        },
        enableReinitialize: true
    });


    const handleChange = event => {
        formik.setFieldValue('disciplines', event.target.value);
    };

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
                                renderValue={selected => selected.map(descipline => disciplineValue[descipline] + ', ')}
                                MenuProps={MenuProps}
                                onBlur={formik.handleBlur}
                                error={formik.touched.disciplines && formik.errors.disciplines}
                            >
                                {Disciplines.map(item => (
                                    <MenuItem key={item} value={item}>
                                        <Checkbox checked={checked.indexOf(item) > -1} />
                                        <ListItemText primary={disciplineValue[item]} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='buttons-container'>
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
        </Fragment>
    )
}

TeacherData.defaultProps = {
    teacher: {},
}

const mapStateToProps = ({}) => {
    return {

    }
};

const mapDispatchToProps = dispatch => ({
    updateTeacher: (id, data) => dispatch(updateTeacher(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherData);