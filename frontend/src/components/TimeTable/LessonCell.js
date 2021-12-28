import React from 'react';
import {NavLink} from "react-router-dom";
import TableCell from "./TimeTable";



const LessonCell = (props) => {
  const {index, color, lesson} = props;
  return (
      <TableCell
                 className={`lessons-timetable__cell
                                       ${lesson.duration === 60 && 'lessons-timetable__cell--border-none'}
                                    `   }
                 style={{backgroundColor: color}}
      >
          <NavLink
              to={`/admin/lessons/edit/${lesson.id}`}
              className={`lessons-timetable__lesson-link
                                                ${lesson.duration === 60 && 'lessons-timetable__lesson-link--color-transparent'}
                                    `           }
          >
              <span className={`lessons-type-symbol`}>{lesson.isSingleLesson ? '?' : ''}</span>
          </NavLink>
      </TableCell>
  )
};

export default LessonCell;