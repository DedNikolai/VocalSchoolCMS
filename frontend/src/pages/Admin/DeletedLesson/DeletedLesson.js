import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import './DeletedLesson.scss';
import {colors} from '../../../constants/view';
import {getDeletedLessonById} from '../../../store/actions/deletedLesson';
import {NavLink} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 500
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
        width: 100,

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function DeletedLesson(props) {
    const classes = useStyles();
    const {getDeletedLessonById, deletedLessonByIdLoading, deletedLesson} = props;
    const id = props.match.params.id;
    const theme = useTheme();

    useEffect(() => {
        getDeletedLessonById(id);
    }, []);

    if (deletedLessonByIdLoading) {
        return <Preloader/>
    }

    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        label="Учень"
                        name='student'
                        id="outlined-size-small"
                        value={deletedLesson.student.firstName + ' ' + deletedLesson.student.lastName}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="Учень"
                        name='teacher'
                        id="outlined-size-small"
                        value={deletedLesson.teacher.firstName + ' ' + deletedLesson.teacher.lastName}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        id="date"
                        label="Початкова дата заняття"
                        type="date"
                        value={deletedLesson.lessonDate.slice(0, 10)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="time"
                        type="time"
                        variant="outlined"
                        className={classes.textField}
                        value={deletedLesson.lessonTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="reason"
                        variant="outlined"
                        className={classes.textField}
                        value={deletedLesson.reason}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className='buttons-container'>
                    <NavLink to='/admin/lessons' className='main-menu__item'>
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
            </form>
        </Paper>
    )
}

DeletedLesson.propTypes = {
    getDeletedLessonById: PropTypes.func.isRequired,
    deletedLessonByIdLoading: PropTypes.bool.isRequired,
    transferLesson: PropTypes.object,
};

DeletedLesson.defaultProps = {
    deletedLesson: {}
}

const mapStateToProps = ({deletedLessons}) => {
    return {
        deletedLesson: deletedLessons.deletedLessonById,
        deletedLessonByIdLoading: deletedLessons.deletedLessonByIdLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getDeletedLessonById: (id) => dispatch(getDeletedLessonById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletedLesson);