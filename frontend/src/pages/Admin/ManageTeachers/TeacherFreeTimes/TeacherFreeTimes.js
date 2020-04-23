import React, {forwardRef} from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {makeStyles} from "@material-ui/core/styles/index";
import {createWorkTime, deleteWorkTime, updateWorkTime} from "../../../../store/actions/teacher";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function TeacherFreeTimes(props) {
    const {teacher, updateTime, createTime, deleteTime} = props;
    const {workTimes} = teacher;
    const [state, setState] = React.useState({
        columns: [
            { title: 'День', field: 'day', lookup: {'MONDAY': 'Понеділок', 'TUESDAY': 'Вівторок', 'WEDNESDAY': 'Середа', 'THURSDAY': 'Четвер', 'FRIDAY': 'Пятниця', 'SUTURDAY': 'Субота'}},
            { title: 'Початок', field: 'startTime', editComponent: props => <Time data={props}/>},
            { title: 'Кінець', field: 'endTime', editComponent: props => <Time data={props} />},
        ],
    });

    return (
        <MaterialTable
            title="Робочі години"
            options={{
                search: false,
                paging: false
            }}
            icons={tableIcons}
            columns={state.columns}
            data={workTimes}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            createTime(newData, teacher.id)
                        }, 0);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updateTime(newData, newData.id, teacher.id)
                            }
                        },0);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            deleteTime(oldData.id, teacher.id)
                        }, 0);
                    }),
            }}
        />
    );
}

function Time(props) {
    const classes = useStyles();
    const {value, onChange} = props.data;
    const changeTime = (e) => {
        onChange(e.target.value);
    };

    return (
        <TextField
            id="time"
            label="Час"
            type="time"
            defaultValue={value || '09:00'}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                step: 900, // 5 min
            }}
            onChange={changeTime}
        />
    )
}

TeacherFreeTimes.propTypes = {
    updateTime: PropTypes.func.isRequired,
    createTime: PropTypes.func.isRequired,
    deleteTime: PropTypes.func.isRequired,
};

TeacherFreeTimes.defaultProps = {

}

const mapStateToProps = ({}) => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    updateTime: (data, timeId, teacherId) => dispatch(updateWorkTime(data, timeId, teacherId)),
    createTime: (data, id) => dispatch(createWorkTime(data, id)),
    deleteTime: (timeId, teacherId) => dispatch(deleteWorkTime(timeId, teacherId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFreeTimes);