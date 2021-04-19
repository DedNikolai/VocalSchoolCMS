import React, {Fragment, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid
} from '@material-ui/core';
import Budget from '../../../components/dashboard/Budget/Budget';
import LatestOrders from '../../../components/dashboard/LatestOrders/LatestOrders';
import LatestProducts from '../../../components/dashboard/LatestProducts/LatestProducts';
import Sales from '../../../components/dashboard/Sales/Sales';
import TasksProgress from '../../../components/dashboard/TasksProgress/TasksProgress';
import TotalCustomers from '../../../components/dashboard/TotalCustomers/TotalCustomers';
import TotalProfit from '../../../components/dashboard/TotalProfit/TotalProfit';
import TrafficByDevice from '../../../components/dashboard/TrafficByDevice/TrafficByDevice';
import moment from "moment";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import uaLocale from "date-fns/locale/uk";
import DateFnsUtils from '@date-io/date-fns';
import './Stats.scss';
import {colors} from "../../../constants/view";
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {getStudentsByDates} from "../../../store/actions/student";
import {getLessonsByDates} from "../../../store/actions/confirmedLesson";
import {getAbonementsByDates} from "../../../store/actions/abonements";
import {getAllTeachers} from "../../../store/actions/teacher";
import Preloader from '../../../components/Preloader/index';

const Stats = (props) => {
    const [startDate, changeStartDate] = useState('2020-01-01');
    const [finishDate, changeFinishDate] = useState(moment(new Date()).format().slice(0, 10));
    const {abonements, abonementsLoading, getAbonements, lessons, lessonsLoading, getLessons,
        students, studentsLoading, getStudents, teachers, teachersLoading, getTeachers} = props;

    useEffect(() => {
        getAbonements(startDate, finishDate);
        getLessons(startDate, finishDate);
        getStudents(startDate, finishDate);
        getTeachers();
    }, []);

    const changeStart = (date) => {
        const value = moment(date).format().slice(0, 10);
        changeStartDate(value);
    };

    const changeFinish = (date) => {
        const value = moment(date).format().slice(0, 10);
        changeFinishDate(value);
    };

    const getDataByDates = () => {
        getAbonements(startDate, finishDate);
        getLessons(startDate, finishDate);
        getStudents(startDate, finishDate);
    }

    if (abonementsLoading || studentsLoading || lessonsLoading || teachersLoading) return <Preloader/>;

    return (
        <Fragment>
            {/*<Helmet>*/}
            {/*<title>Dashboard | Material Kit</title>*/}
            {/*</Helmet>*/}
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    >
                        <h2>Виберіть Період</h2>
                        <div className='dates-container'>
                            <div className='dates-container__item'>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uaLocale}>
                                    <Grid container>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd-MM-yyyy"
                                            margin="normal"
                                            id="date-picker-start"
                                            label="Дата"
                                            value={startDate}
                                            onChange={changeStart}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className='dates-container__item'>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={uaLocale}>
                                    <Grid container>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd-MM-yyyy"
                                            margin="normal"
                                            id="date-picker-finish"
                                            label="Дата"
                                            value={finishDate}
                                            onChange={changeFinish}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className='dates-container__item'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{backgroundColor: colors.COLOR_GREEN}}
                                    onClick={() => getDataByDates()}
                                >
                                    Сформувати
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <Budget abonements={abonements}/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TotalCustomers students={students}/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TasksProgress abonements={abonements}/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TotalProfit lessons={lessons}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <Sales teachers={teachers} lessons={lessons}/>
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            <TrafficByDevice abonements={abonements} sx={{height: '100%'}}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fragment>
        )
};

const mapStateToProps = ({abonement, student, confirmedLessons, teacher}) => ({
    abonements: abonement.abonementsByDates,
    abonementsLoading: abonement.abonementsByDatesLoading,
    lessons: confirmedLessons.confirmedLessonsByDates,
    lessonsLoading: confirmedLessons.confirmedLessonsByDatesLoading,
    students: student.studentByDates,
    studentsLoading: student.studentByDatesLoading,
    teachers: teacher.teachers,
    teachersLoading: teacher.teachersLoading
});

const mapDispatchToProps = dispatch => ({
    getAbonements: (startDate, finishDate) => dispatch(getAbonementsByDates(startDate, finishDate)),
    getLessons: (startDate, finishDate) => dispatch(getLessonsByDates(startDate, finishDate)),
    getStudents: (startDate, finishDate) => dispatch(getStudentsByDates(startDate, finishDate)),
    getTeachers: () => dispatch(getAllTeachers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
