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
import {createTeacherPrice, deletePrice, updateTeacherPrice} from "../../../../store/actions/teacher";
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

function TeacherPrices(props) {
    const {teacher, updatePrice, createPrice, deletePrice} = props;
    const {prices} = teacher;
    const [state, setState] = React.useState({
        columns: [
            { title: 'Дисципліна', field: 'discipline', lookup: {'VOCAL': 'Вокал', 'DRUM': 'Барабани', 'GUITAR': 'Гітара', 'SOLFEGGIO': 'Сальфеджо'},
                cellStyle: {
                    textAlign: 'center',
                },
                headerStyle: {
                    textAlign: 'center',
                }
            },
            { title: 'Тип Заняття', field: 'type', lookup: {'CHILD': 'Дитяче', 'MAN': 'Доросле'},
                cellStyle: {
                    textAlign: 'center',
                },
                headerStyle: {
                    textAlign: 'center',
                }
            },
            { title: 'Ціна', field: 'priceValue', type: 'numeric',
                cellStyle: {
                    textAlign: 'center',
                },
                headerStyle: {
                    textAlign: 'center',
                }
            },
        ],
    });

    return (
        <MaterialTable
            title="Ціни Викладача"
            options={{
                search: false,
                paging: false
            }}
            icons={tableIcons}
            columns={state.columns}
            data={prices}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            const data = {discipline: '', type: '', priceValue: '', };
                            Object.keys(newData).forEach(key => data[key] = newData[key]);
                            createPrice(data, teacher.id)
                        }, 0);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                updatePrice(newData, newData.id, teacher.id)
                            }
                        },0);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            deletePrice(oldData.id, teacher.id)
                        }, 0);
                    }),
            }}
        />
    );
}


TeacherPrices.propTypes = {
    updatePrice: PropTypes.func.isRequired,
    createPrice: PropTypes.func.isRequired,
    deletePrice: PropTypes.func.isRequired,
};

TeacherPrices.defaultProps = {

}

const mapStateToProps = ({}) => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    updatePrice: (data, priceId, teacherId) => dispatch(updateTeacherPrice(data, priceId, teacherId)),
    createPrice: (data, id) => dispatch(createTeacherPrice(data, id)),
    deletePrice: (priceId, teacherId) => dispatch(deletePrice(priceId, teacherId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherPrices);