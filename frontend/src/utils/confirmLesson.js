export const createNewConfirmedLesson = (lesson, date) => {
    const price = lesson.teacher.prices.filter(price => price.type === lesson.type)[0].priceValue;
    return {teacher: lesson.teacher, price: price, student: lesson.student, lesson: lesson, lessonDate: date}
}