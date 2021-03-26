import React from 'react';
import {createAbonement} from "../../../store/actions/abonements";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
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
    const {noDisciplines, noQuantity, noPrice} = ua.pages.manageUsers.errors;
    const errors = {};

    if (!values.discipline) {
        errors.discipline = noDisciplines;
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

function CreateAbonement(props) {
    const classes = useStyles();
    const {createAbonement, student, closeForm} = props;
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            student: {...student},
        },
        validate,
        onSubmit: value => {
            createAbonement(value);
            closeForm();
        },
    });

    const handleChangeDiscipline = event => {
        formik.setFieldValue('discipline', event.target.value);
    };

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
                        value={student.firstName + ' ' + student.lastName}
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
                    <TextField
                        label={formik.touched.quantity && formik.errors.quantity || "Кількість занять"}
                        name='quantity'
                        id="outlined-size-small"
                        defaultValue={''}
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
                        defaultValue={''}
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

CreateAbonement.propTypes = {
    createAbonement: PropTypes.func.isRequired,
    allTeachersLoading: PropTypes.bool.isRequired,
    allTeachers: PropTypes.array,

};

CreateAbonement.defaultProps = {
    allTeachers: [],
}

const mapStateToProps = ({teacher}) => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    createAbonement: data => dispatch(createAbonement(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAbonement);