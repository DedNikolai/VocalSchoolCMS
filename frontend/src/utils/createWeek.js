import moment from 'moment'

const createWeek = date => {
    const currentDate = new Date(date);
    const currentIndex = currentDate.getDay();
    const newArr = Array.apply(null, {length: 7}).map((item, index) => {
       let tempDate;
       let ms;
       if (index === currentIndex) {
           return date;
       }

       if (index < currentIndex) {
            ms = currentDate.getTime() - 3600 * 24 * 1000*(currentIndex - index);
       }

        if (index > currentIndex) {
            ms = currentDate.getTime() + 3600 * 24 * 1000 * (index - currentIndex);
        }
        tempDate = new Date(ms);
        return moment(tempDate).format().slice(0, 10);

    });

    return newArr;
};

export default createWeek;