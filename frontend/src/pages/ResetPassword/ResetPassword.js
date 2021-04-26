import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {chengePassword} from '../../store/actions/user';
import {useFormik} from 'formik';
import colors from '../../constants/colors';
import ua from "../../languages/ua";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: colors.primeryColor,
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: colors.primeryColor,
            },
        },
    },
})(TextField);

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: colors.secondaryColor,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: colors.primeryColor,
    },
}));

const validate = values => {
    const {confirmPassword} = ua.pages.manageUsers.errors;
    const errors = {};
    if (values.newPassword !== values.confirmedPassword) {
        errors.confirmedPassword = confirmPassword;
    }
    return errors;
};

function ResetPassword(props) {
    const classes = useStyles();
    const {updatePassword} = props;
    const [passChanged, setPassChanged] = useState(false);
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    const formik = useFormik({
        initialValues: {token: token},
        validate,
        onSubmit: value => {
            setPassChanged(true);
            updatePassword(value);
        },
    });

    if (passChanged) {
        return <Redirect to={'/admin/login'}/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <CssTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                    />
                    <CssTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmedPassword"
                        label="Confirm_Password"
                        type="password"
                        id="confirm_password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Change Password
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

ResetPassword.propTypes = {
    classes: PropTypes.object,
};

ResetPassword.defaultProps = {
    currentUser: null,
};

const mapStateToProps = ({user}) => ({

});

const mapDispatchToProps = dispatch => ({
    updatePassword: password => dispatch(chengePassword(password))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
