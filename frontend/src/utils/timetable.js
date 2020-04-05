import Day from '../constants/days';
import Classes from '../constants/classes';

const indexCheck = (lesson, index) => {
    return index === Day.indexOf(lesson.day)*4 + Classes.indexOf(lesson.room)
}

export const isLesson = (lessons, time, index) => {
  return lessons.some(lesson => {
        const lessonStart = lesson.timeHour + ':' + (lesson.timeMinutes || '00');
        return time === lessonStart && indexCheck(lesson, index);
  })
};

export const isFullLesson = (lessons, time, index) => {
    return lessons.some(lesson => {
        const lessonStart = lesson.timeHour + ':' + (lesson.timeMinutes || '00');
        return time === lessonStart && indexCheck(lesson, index) && lesson.duration === 60;
    })
}

export const findLessonId = (lessons, time, index) => {
    const currentLesson = lessons.filter(lesson => {
        const lessonStart = lesson.timeHour + ':' + (lesson.timeMinutes || '00');
        return time === lessonStart && indexCheck(lesson, index);
    })[0];

    return currentLesson.id
}