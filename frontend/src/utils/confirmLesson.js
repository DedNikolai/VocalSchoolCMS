export const createNewConfirmedLesson = (lesson, date) => {
    const price = lesson.teacher.prices.filter(price => price.type === lesson.type && lesson.discipline === price.discipline)[0].priceValue;
    return {teacher: lesson.teacher, price: price, student: lesson.student, lesson: lesson, lessonDate: date, time: lesson.time}
}