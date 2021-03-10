import Day from '../constants/days';
import Classes from '../constants/classes';
import lesson from "../store/reducers/lesson/lesson";


const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];

const indexCheck = (lesson, index) => {
    return index === Day.indexOf(lesson.day)*4 + Classes.indexOf(lesson.room)
}

export const isLesson = (lessons, time, index) => {
  return lessons.some(lesson => {
      const lessonStart = convertTimeToMinutes(lesson.time);
      const lessonEnd = convertTimeToMinutes(lesson.time) + lesson.duration;
      const lessonTime = convertTimeToMinutes(time);
      if (lessonTime === lessonStart && indexCheck(lesson, index)) return true
      if (lessonStart < lessonTime && lessonTime < lessonEnd && indexCheck(lesson, index)) return true
      return false;
  })
};

export const isFullLesson = (lessons, time, index) => {
    return lessons.some(lesson => {
        const lessonStart = convertTimeToMinutes(lesson.time);
        const lessonTime = convertTimeToMinutes(time);
        return lessonTime === lessonStart && indexCheck(lesson, index) && lesson.duration === 60;
    })
}

export const findLessonId = (lessons, time, index) => {
    const currentLesson = lessons.filter(lesson => {
        const lessonStart = convertTimeToMinutes(lesson.time);
        const lessonTime = convertTimeToMinutes(time);
        const lessonEnd = convertTimeToMinutes(lesson.time) + lesson.duration;
        return lessonTime === lessonStart || (lessonStart < lessonTime && lessonTime < lessonEnd) && indexCheck(lesson, index);
    })[0];

    return currentLesson.id
}

const convertTimeToMinutes = time => {
    const arr = time.split(':');
    return +arr[0]*60 + +arr[1];
}

export const isTimeClosed = (lessons, time, index) => {
    return lessons.some(lesson => {
        const lessonStart = convertTimeToMinutes(lesson.time);
        const lessonTime = convertTimeToMinutes(time);
        const lessonEnd = convertTimeToMinutes(lesson.time) + lesson.duration;
        if (lessonTime === lessonStart && Math.floor(index/4) === Day.indexOf(lesson.day)) return true
        if (lessonEnd - 30 === lessonTime && Math.floor(index/4) === Day.indexOf(lesson.day)) return true;
        return false
    })
}

export const isFreeTime = (freeTimes, time, index) => {
    const currentDay = freeTimes.filter(freetime => freetime.day === Day[Math.floor(index/4)]);
    return currentDay.some(day => {
        const start = convertTimeToMinutes(day.startTime);
        const end = convertTimeToMinutes(day.endTime) - 30;
        const tableTime = convertTimeToMinutes(time);
        return tableTime >= start && tableTime <= end;
    })
};

export const freeTeacherTimes = (lessons, duration, worktimes, day) => {
    const teacherWorktimes = times.filter(time => {
        const currentTime = convertTimeToMinutes(time) + duration;
        return worktimes.some(worktime => {
            if (convertTimeToMinutes(time) >= convertTimeToMinutes(worktime.startTime) && currentTime <= convertTimeToMinutes(worktime.endTime)) {
                return true;
            }
        })
    });

    return teacherWorktimes.filter(time => {
        const currentTime = convertTimeToMinutes(time) + duration;
        return !lessons.filter(lesson => !lesson.isTestLesson && lesson.day === day).some(lesson => {
            if (convertTimeToMinutes(lesson.time) < currentTime &&  currentTime < convertTimeToMinutes(lesson.time) + lesson.duration) {
                return true;
            }

            if (convertTimeToMinutes(lesson.time) < currentTime &&  convertTimeToMinutes(time) < convertTimeToMinutes(lesson.time) + lesson.duration) {
                return true;
            }

            if (time === lesson.time && duration === lesson.duration) {
                return true;
            }


        })
    })
};

export const freeClasseForCurrentTime = (time, duration, lessons) => {
    const currenLessons = lessons.filter(lesson => {
        const currentTime = convertTimeToMinutes(time) + duration;
        if (convertTimeToMinutes(lesson.time) < currentTime &&  currentTime < convertTimeToMinutes(lesson.time) + lesson.duration) {
            return true;
        }

        if (convertTimeToMinutes(lesson.time) < currentTime &&  convertTimeToMinutes(time) < convertTimeToMinutes(lesson.time) + lesson.duration) {
            return true;
        }

        if (time === lesson.time && duration === lesson.duration) {
            return true;
        }
    })

    return Classes.filter(room => !currenLessons.some(lesson => lesson.room === room));
}