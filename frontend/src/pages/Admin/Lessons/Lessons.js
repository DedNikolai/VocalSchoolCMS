import React, {Fragment, useEffect, useState} from 'react';
import {getAllLessonsByDates} from "../../../store/actions/lesson";
import {connect} from 'react-redux';
import Preloader from '../../../components/Preloader/index';
import TimeTable from '../../../components/TimeTable/TimeTable';
import moment from 'moment'
import createWeek from '../../../utils/createWeek'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import uaLocale from "date-fns/locale/uk";

function Lessons(props) {
    const {allLessons, allLessonsLoading, getAllByDates} = props;
    const [currentDate, changeCurrentDate] = useState(moment(new Date()).format().slice(0, 10));
    const week = createWeek(currentDate);

    useEffect(() => {
        getAllByDates(week[1], week[week.length-1]);
    }, []);

    if (allLessonsLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

    const changeDate = (date) => {
        const value = moment(date).format().slice(0, 10);
        changeCurrentDate(value);
        const currentWeek = createWeek(value);
        getAllByDates(currentWeek[1], currentWeek[currentWeek.length-1]);
    };
    return (
        <Fragment>
            <h2>Розклад Школи</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uaLocale}>
                <Grid container>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Дата"
                        value={currentDate}
                        onChange={changeDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <TimeTable lessons={allLessons} week={createWeek(currentDate)}/>
        </Fragment>
    )
}

Lessons.defaultProps = {
    allLessons: [],
};

const mapStateToProps = ({lesson}) => {
    return {
        allLessons: lesson.lessons,
        allLessonsLoading: lesson.lessonsLoading
    }
};

const mapDispatchToProps = dispatch => ({
    getAllByDates: (startDate, finishDate) => dispatch(getAllLessonsByDates(startDate, finishDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);