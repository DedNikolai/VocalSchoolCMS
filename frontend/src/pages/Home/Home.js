import React from 'react';
import './Home.scss';
import {NavLink} from 'react-router-dom'

function Home() {
    return (
        <div className='home'>
            <NavLink to='/admin/login'>
                <h1 className='home__login'>LogIn</h1>
            </NavLink>
        </div>
    )
}

export default Home;