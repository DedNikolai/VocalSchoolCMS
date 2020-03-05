import React from 'react';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from "@material-ui/core/styles/index";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#fff'
    },
    container: {
        maxHeight: 440,
    },

    cell: {
        padding: '2px',
        textAlign: 'center'
    },

    headCell: {
        backgroundColor: '#fff',
        fontWeight: 'bold'
    },
});

function TeacherTableRow(props) {
    const {teacher, columns, deleteTeacher} = props;
    const classes = useStyles();
    const disciplines = teacher.disciplines.join(', ');
    const students = teacher.students.length
    return (
        <TableRow hover role="checkbox" tabIndex={-1} >
            {columns.map(column => {
                const value = teacher[column.id];
                if (column.id === 'actions') {
                    return (
                        <TableCell className={classes.cell}>
                            <IconButton>
                                <NavLink to={`/admin/teachers/edit/${teacher.id}`}>
                                    <Edit/>
                                </NavLink>
                            </IconButton>
                            <IconButton>
                                <DeleteOutline onClick={() => deleteTeacher(teacher.id)}/>
                            </IconButton>
                        </TableCell>
                    )
                }
                if (column.id === 'students') {
                    return (
                        <TableCell key={column.id} align={column.align}>
                            {students}
                        </TableCell>
                    )
                }
                if (column.id === 'disciplines') {
                    return (
                        <TableCell key={column.id} align={column.align}>
                            {disciplines}
                        </TableCell>
                    )
                }
                return (
                    <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                );
            })}
        </TableRow>
    )
}

export default TeacherTableRow;