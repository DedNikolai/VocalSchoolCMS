import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {resetPassword} from '../../store/actions/user';
import {useFormik} from 'formik';
import colors from '../../constants/colors';

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

function ForgotPassword(props) {
    const classes = useStyles();
    const {resetPasswordByEmail} = props;
    const [resetPass, setResetPass] = useState(false);

    const formik = useFormik({
        initialValues: {},
        onSubmit: value => {
            setResetPass(true);
            resetPasswordByEmail(value.email);
        },
    });

    if (resetPass) {
        return <Redirect to={'/admin/reset-password'}/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <CssTextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        color={colors.primeryColor}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </Container>
    );
}

ForgotPassword.propTypes = {
    resetPasswordByEmail: PropTypes.func.isRequired,
}

ForgotPassword.defaultProps = {

}

const mapStateToProps = ({user}) => ({

})

const mapDispatchToProps = dispatch => ({
    resetPasswordByEmail: email => dispatch(resetPassword(email))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
