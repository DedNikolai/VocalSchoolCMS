import React, {useEffect} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../components/Preloader/index';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import Admin from './Admin/Admin';
import {getCurrentUser} from "../store/actions/user";
import Home from './Home/Home';

function AppRouter(props) {
    const {currentUser, currentUserLoading, getCurrentUser, authLoading} = props;

    useEffect(() => {
        getCurrentUser();
    }, []);

    if (currentUserLoading || authLoading) {
        return <div className="wrapper"><Preloader/></div>
    }

    return (
        <Switch>
            <Route path="/admin/login" component={Login}/>
            <Route path="/admin/forgot-password" component={ForgotPassword}/>
            <Route path="/admin/reset-password" component={ResetPassword}/>
            <ProtectedRoute path="/admin" component={Admin} authenticated={!!currentUser}/>
            <Route path="/" component={Home}/>
        </Switch>
    )
};

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? <Component {...props} /> : <Redirect to="/admin/login"/>
        }
    />
)

AppRouter.propTypes = {
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool.isRequired,
    authLoading: PropTypes.bool.isRequired,
    getCurrentUser: PropTypes.func
};

AppRouter.defaultProps = {
    currentUser: null,
};

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser,
        currentUserLoading: user.currentUserLoading,
        authLoading: user.authLoading
    }
}

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));