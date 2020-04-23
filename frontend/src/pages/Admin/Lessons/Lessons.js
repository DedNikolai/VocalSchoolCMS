import React, {Fragment, useEffect} from 'react';
import {getAllLessons} from "../../../store/actions/lesson";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import TimeTable from '../../../components/TimeTable/TimeTable';

function Lessons(props) {
    const {allLessons, allLessonsLoading, getAllLessons} = props;

    useEffect(() => {
        getAllLessons();
    }, []);

    if (allLessonsLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

    return (
        <Fragment>
            <h2>Розклад Школи</h2>
            <TimeTable lessons={allLessons}/>
        </Fragment>
    )
}

Lessons.propTypes = {
    allLessons: PropTypes.array,
    allLessonsLoading: PropTypes.bool.isRequired,
    getAllLessons: PropTypes.func.isRequired,
};

Lessons.defaultProps = {
    allLessons: [],
}

const mapStateToProps = ({lesson}) => {
    return {
        allLessons: lesson.lessons,
        allLessonsLoading: lesson.lessonsLoading
    }
};

const mapDispatchToProps = dispatch => ({
    getAllLessons: () => dispatch(getAllLessons())
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);