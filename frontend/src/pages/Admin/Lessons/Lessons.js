import React, {Fragment, useEffect, useState} from 'react';
import {getAllLessons} from "../../../store/actions/lesson";
import {connect} from 'react-redux';
import Preloader from '../../../components/Preloader/index';
import TimeTable from '../../../components/TimeTable/TimeTable';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
import createWeek from '../../../utils/createWeek'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '40px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function Lessons(props) {
    const {allLessons, allLessonsLoading, getAllLessons} = props;
    const [currentDate, changeCurrentDate] = useState(moment(new Date()).format().slice(0, 10));
    const classes = useStyles();

    useEffect(() => {
        getAllLessons();
    }, []);

    if (allLessonsLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

    const changeDate = (event) => {
        changeCurrentDate(event.target.value)
    };

    const week = createWeek(currentDate);

    return (
        <Fragment>
            <h2>Розклад Школи</h2>
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="Дата"
                    type="date"
                    value={currentDate}
                    className={classes.textField}
                    onChange={(value) => changeDate(value)}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
            <TimeTable lessons={allLessons} week={week}/>
        </Fragment>
    )
}

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