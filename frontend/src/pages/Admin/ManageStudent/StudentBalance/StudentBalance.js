import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import disciplineValue from '../../../../constants/disciplineValue';
import {connect} from "react-redux";
import {getAbonementsByStudent} from "../../../../store/actions/abonements";
import Preloader from '../../../../components/Preloader/index';

const useStyles = makeStyles({
    table: {

    },
});

function StudentBalance(props) {
    const classes = useStyles();
    const {studentId, abonements = [], abonementsLoading, getStudentAbonements} = props;

    useEffect(() => {
        getStudentAbonements(studentId);
    }, []);

    if (abonementsLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

    const deletedLessons = lessons => {
        return lessons.filter(lesson => lesson.isUsed).length
    };

    const transferedLessons = lessons => {
        return lessons.filter(lesson => !lesson.isUsed).length
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Дисципліна</TableCell>
                        <TableCell align="center">Загальна к-ть занять</TableCell>
                        <TableCell align="center">Ціна</TableCell>
                        <TableCell align="center">Використані заняття</TableCell>
                        <TableCell align="center">Підтверджені</TableCell>
                        <TableCell align="center">Перенесені</TableCell>
                        <TableCell align="center">Відмінені</TableCell>
                        <TableCell align="center">Дії</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {abonements.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="center">
                                {disciplineValue[row.discipline]}
                            </TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                            <TableCell align="center">{row.usedQuantity}</TableCell>
                            <TableCell align="center">{row.confirmedLessons.length}</TableCell>
                            <TableCell align="center">{transferedLessons(row.deletedLessons)}</TableCell>
                            <TableCell align="center">{deletedLessons(row.deletedLessons)}</TableCell>
                            <TableCell align="center">
                                <IconButton>
                                    <NavLink to={`/admin/abonements/edit/${row.id}`}>
                                        <Edit/>
                                    </NavLink>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

StudentBalance.defaultProps = {
    abonements: [],
}

const mapStateToProps = ({abonement}) => {
    return {
        abonements: abonement.abonementsByStudent,
        abonementsLoading: abonement.abonementsByStudentLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getStudentAbonements: (id) => dispatch(getAbonementsByStudent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentBalance);
