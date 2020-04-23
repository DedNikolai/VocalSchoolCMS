import Day from '../constants/days';
import Classes from '../constants/classes';

const indexCheck = (lesson, index) => {
    return index === Day.indexOf(lesson.day)*4 + Classes.indexOf(lesson.room)
}

export const isLesson = (lessons, time, index) => {
  return lessons.some(lesson => {
      const lessonStart = lesson.timeHour*60 + lesson.timeMinutes
      const lessonEnd = lesson.timeHour*60 + lesson.timeMinutes + lesson.duration;
      const lessonTime = convertTimeToMinutes(time);
      if (lessonTime === lessonStart && indexCheck(lesson, index)) return true
      if (lessonStart < lessonTime && lessonTime < lessonEnd && indexCheck(lesson, index)) return true
      return false;
  })
};

export const isFullLesson = (lessons, time, index) => {
    return lessons.some(lesson => {
        const lessonStart = lesson.timeHour*60 + lesson.timeMinutes;
        const lessonTime = convertTimeToMinutes(time);
        return lessonTime === lessonStart && indexCheck(lesson, index) && lesson.duration === 60;
    })
}

export const findLessonId = (lessons, time, index) => {
    const currentLesson = lessons.filter(lesson => {
        const lessonStart = lesson.timeHour*60 + lesson.timeMinutes;
        const lessonTime = convertTimeToMinutes(time);
        const lessonEnd = lesson.timeHour*60 + lesson.timeMinutes + lesson.duration;
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
        const lessonStart = lesson.timeHour*60 + lesson.timeMinutes;
        const lessonTime = convertTimeToMinutes(time);
        const lessonEnd = lesson.timeHour*60 + lesson.timeMinutes + lesson.duration;
        if (lessonTime === lessonStart && index < (Day.indexOf(lesson.day)+1)*4) return true
        if (lessonEnd - 30 === lessonTime && index < (Day.indexOf(lesson.day)+1)*4) return true;
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
}