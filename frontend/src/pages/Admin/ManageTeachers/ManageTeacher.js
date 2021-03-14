import React, {Fragment, useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {createTeacher, getTeacherById, updateTeacher} from "../../../store/actions/teacher";
import {connect} from "react-redux";
import Preloader from '../../../components/Preloader/index';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import './ManageTeacher.scss';
import {colors} from '../../../constants/view';
import TimeTable from '../../../components/TimeTable/TimeTable';
import TeacherFreeTimes from './TeacherFreeTimes/TeacherFreeTimes';
import TeacherPrices from './TeacherPrices/TeacherPrices'
import TeachersConfirmedLessons from './TeachersConfirmedLessons/TeachersConfirmedLessons';
import TeacherData from './TeacherData/TeacherData';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        width: 100,
    },
}));

function ManageTeacher(props) {
    const classes = useStyles();
    const {teacher, teacherLoading, getTeacher, updateTeacher} = props;
    const id = props.match.params.id;
    const [changed, setChanged] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getTeacher(id);
    }, []);


    if (changed) {
        return <Redirect to='/admin/teachers' />
    }
    if (teacherLoading) {
        return <div className="wrapper"><Preloader/></div>
    }

    return (
        <Fragment>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Особисті дані" {...a11yProps(0)} />
                        <Tab label="Розклад" {...a11yProps(1)} />
                        <Tab label="Робочі години" {...a11yProps(2)} />
                        <Tab label="Ціни" {...a11yProps(3)} />
                        <Tab label="Уроки" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <TeacherData teacher={teacher} setChanged={setChanged} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h2>Особистий Розклад</h2>
                    <TimeTable lessons={teacher.lessons} freeTime={teacher.workTimes}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h2>Робочі години</h2>
                    <TeacherFreeTimes teacher={teacher}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <h2>Ціни</h2>
                    <TeacherPrices teacher={teacher}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <h2>Не проплачені урокі</h2>
                    <TeachersConfirmedLessons teacherId={teacher.id}/>
                </TabPanel>
            </div>
            <div className='buttons-container'>
                <NavLink to='/admin/teachers'>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        style={{backgroundColor: colors.secondaryColor}}
                    >
                        Cancel
                    </Button>
                </NavLink>
            </div>
        </Fragment>
    )
}

ManageTeacher.defaultProps = {
    teacher: {},
}

const mapStateToProps = ({teacher}) => {
    return {
        teacher: teacher.teacherById,
        teacherLoading: teacher.teacherByIdLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getTeacher: (id) => dispatch(getTeacherById(id)),
    updateTeacher: (id, data) => dispatch(updateTeacher(id, data)),
    createTeacher: data => dispatch(createTeacher(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'} variant={'body2'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};
