import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {getStudentById, getStudentTransfers, updateStudent} from "../../../store/actions/student";
import {getLessonsByStudent} from "../../../store/actions/lesson";
import {connect} from "react-redux";
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import './ManageStudent.scss';
import {colors} from '../../../constants/view';
import CreateLesson from '../CreateLesson/CreateLesson';
import CreateAbonement from '../CreateAbonement/CreateAbonement';
import StudentLessons from './StudentLessons/StudentLessons';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import StudentBalance from './StudentBalance/StudentBalance';
import StudentTransfers from './StudentTransfers/StudentTransfers';
import StudentCredits from './StudentCredits/StudentCredits';
import StudentData from './StudentData/StudentData';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },

    button: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function ManageStudent(props) {
    const classes = useStyles();
    const {student, studentLoading, getStudent, updateStudent,
        studentLessons, studentLessonsLoading, getStudentLessons,
        studentTransfers, studentTransfersLoading, loadStudentTransfers} = props;
    const id = props.match.params.id;
    const [changed, setChanged] = useState(false);
    const [addLesson, setAddLesson] = useState(false);
    const [addAbonement, setAddAbonement] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        if (id) {
            getStudent(id);
            getStudentLessons(id);
            loadStudentTransfers(id)
        }
    }, []);

    if (changed) {
        return <Redirect to='/admin/students' />
    }

    if (studentLessonsLoading || studentLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

    const tableLessons = studentLessons.filter(lesson => !lesson.isTestLesson);
    const testLessons = studentLessons.filter(lesson => lesson.isTestLesson);

    return (
        <div className='manage-student'>
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
                        <Tab label="Абонементи" {...a11yProps(1)} />
                        <Tab label="Особистий розклад" {...a11yProps(2)} />
                        <Tab label="Перенесені уроки" {...a11yProps(3)} />
                        <Tab label="Борги" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div>
                        <h2>Особисті дані</h2>
                        <StudentData student={student} setChanged={setChanged} />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h2>Абонементи</h2>
                    <Paper>
                        <div className='balance-table-container'>
                            <StudentBalance rows={student.abonements} />
                        </div>
                    </Paper>
                    <div className='buttons-container'>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<PlaylistAddCheckIcon />}
                            style={{backgroundColor: colors.COLOR_GREEN}}
                            onClick={() => setAddAbonement(true)}
                        >
                            Додати абонемент
                        </Button>
                    </div>
                    {
                        addAbonement &&
                        <div className='manage-student__add-lesson'>
                            <CreateAbonement student={student} closeForm={() => setAddAbonement(false)}/>
                        </div>
                    }
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h2>Планові заняття</h2>
                    <StudentLessons lessons={tableLessons} studentId={student.id}/>
                    <h2>Тестові заняття</h2>
                    <StudentLessons lessons={testLessons} studentId={student.id}/>
                    <div className='buttons-container'>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<PlusOneIcon />}
                            style={{backgroundColor: colors.COLOR_GREEN}}
                            onClick={() => setAddLesson(true)}
                        >
                            Додати заняття
                        </Button>
                    </div>
                    {
                        addLesson &&
                        <div className='manage-student__add-lesson'>
                            <CreateLesson student={student} closeForm={() => setAddLesson(false)}/>
                        </div>
                    }
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <h2>Перенесені уроки</h2>
                    {
                        studentTransfersLoading ? <Preloader/> :
                            <StudentTransfers tarnsferedLessons={studentTransfers} />
                    }
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <h2>Заборгованості</h2>
                    <StudentCredits studentId={student.id}/>
                </TabPanel>
            </div>
            <div className='buttons-container'>
                <NavLink to='/admin/students'>
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
        </div>
    )
}


ManageStudent.defaultProps = {
    student: null,
    allTeachers: [],
    studentLessons: []
}

const mapStateToProps = ({student, teacher, lesson}) => {
    return {
        student: student.studentById,
        studentLoading: student.studentByIdLoading,
        studentLessons: lesson.lessonsByStudent,
        studentLessonsLoading: lesson.lessonsByStudentLoading,
        studentTransfers: student.studentTransferLessons,
        studentTransfersLoading: student.studentTransferLessonsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getStudent: (id) => dispatch(getStudentById(id)),
    updateStudent: (id, data) => dispatch(updateStudent(id, data)),
    getStudentLessons: id => dispatch(getLessonsByStudent(id)),
    loadStudentTransfers: id => dispatch(getStudentTransfers(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);

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
}