import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {getAbonementById, updateAbonement} from "../../../store/actions/abonements";
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
import {colors} from '../../../constants/view';
import Disciplines from '../../../constants/disciplines';
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
}));

const validate = values => {
    const {noDisciplines, noQuantity, noTeacher, noPrice} = ua.pages.manageUsers.errors;
    const errors = {};

    if (!values.discipline) {
        errors.discipline = noDisciplines;
    }


    if (!values.teacher) {
        errors.teacher = noTeacher;
    }

    if (!values.quantity) {
        errors.quantity = noQuantity;
    }

    if (!values.price) {
        errors.price = noPrice;
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

function ManageAbonement(props) {
    const classes = useStyles();
    const {updateAbonement, allTeachersLoading, getTeachers, allTeachers, abonementById,
        getAbonement, abonementByIdLoading} = props;
    const theme = useTheme();
    const [close, setClose] = useState(false);
    const id = props.match.params.id;

    const formik = useFormik({
        initialValues: {...abonementById},
        validate,
        onSubmit: value => {
            updateAbonement(value, id);
        },
        enableReinitialize: true
    });

    useEffect(() => {
        getAbonement(id);
        getTeachers();
    }, []);

    const handleChangeDiscipline = event => {
        formik.setFieldValue('discipline', event.target.value);
        formik.setFieldValue('teacher', {});
    };

    const handleChangeTeacher = event => {
        formik.setFieldValue('teacher', event.target.value);
    };

    if (close) {
        return <Redirect to='/admin/abonements' />
    }

    if (allTeachersLoading || abonementByIdLoading) {
        return <div className="wrapper"><Preloader/></div>
    }

    const checkedTeacher = formik.values.teacher || {};
    const checkedDiscipline = formik.values.discipline || '';
    const isValid = !Object.keys(formik.errors).length && Object.keys(formik.touched).length !== 0;

    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Учень"
                        name='student'
                        id="outlined-size-small"
                        value={formik.values.student.firstName + ' ' + formik.values.student.lastName}
                        variant="outlined"
                        size="small"
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
                            renderValue={() => checkedDiscipline}
                            value={checkedDiscipline}
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
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.teacher && formik.errors.teacher || 'Вчитель'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teacher'
                            onChange={handleChangeTeacher}
                            input={<Input />}
                            renderValue={() => checkedTeacher.id ? checkedTeacher.firstName + ' ' + checkedTeacher.lastName : ''}
                            onBlur={formik.handleBlur}
                            error={formik.touched.teacher && formik.errors.teacher}
                            value={checkedTeacher}
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
                    <TextField
                        label={formik.touched.quantity && formik.errors.quantity || "Кількість занять"}
                        name='quantity'
                        id="outlined-size-small"
                        value={formik.values.quantity}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.touched.quantity && formik.errors.quantity}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div>
                    <TextField
                        label={formik.touched.price && formik.errors.price || "Вартість"}
                        name='price'
                        id="outlined-size-small"
                        value={formik.values.price}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.touched.price && formik.errors.price}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className='buttons-container'>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => setClose(true)}
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

ManageAbonement.propTypes = {
    updateAbonement: PropTypes.func.isRequired,
    getAbonement: PropTypes.func.isRequired,
    getTeachers: PropTypes.func.isRequired,
    allTeachersLoading: PropTypes.bool.isRequired,
    abonementByIdLoading: PropTypes.bool.isRequired,
    allTeachers: PropTypes.array,
    abonementById: PropTypes.object,

};

ManageAbonement.defaultProps = {
    allTeachers: [],
}

const mapStateToProps = ({teacher, abonement}) => {
    return {
        allTeachers: teacher.teachers,
        allTeachersLoading: teacher.teachersLoading,
        abonementById: abonement.abonementById,
        abonementByIdLoading: abonement.abonementByIdLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getTeachers: () => dispatch(getAllTeachers()),
    getAbonement: (id) => dispatch(getAbonementById(id)),
    updateAbonement: (data, id) => dispatch(updateAbonement(data, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAbonement);