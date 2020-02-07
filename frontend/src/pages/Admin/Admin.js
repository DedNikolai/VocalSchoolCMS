import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {userSignOut} from '../../store/actions/user'
import PropTypes from 'prop-types'

function Admin(props) {
    const [text, setText] = useState('');
    const {userSignOut} = props;

    useEffect(() => {
        fetch('/api/v1/hello').then(res => {
            return res.text()
        }).then(text => setText(text))
    }, [])

    return (
        <>
        <h1>{text} in ADMIN panel</h1>
            <button onClick={userSignOut}>sign out</button>
            </>
    )
}

Admin.propTypes = {

}

const mapStateToProps = ({user}) => ({

})

const mapDispatchToProps = dispatch => ({
    userSignOut: () => dispatch(userSignOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin);