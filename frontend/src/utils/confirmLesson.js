export const createNewConfirmedLesson = (lesson, date) => {
    const price = lesson.teacher.prices.filter(price => price.type === lesson.type)[0].priceValue;
    const time = `${lesson.timeHour}:${lesson.timeMinutes || '00'}`;
    return {teacher: lesson.teacher, price: price, student: lesson.student, lesson: lesson, lessonDate: date, lessonTime: time}
}