const ua = {
    menu: {
        main: 'Головна',
        users: 'Користувачі',
        timetable: 'Розклад',
        students: 'Учні',
        teachers: 'Вчителі',
        confirmedLessons: 'Підтверджені уроки',
        transferLessons: 'Перенесені Уроки',
        deleted: 'Скасовані Уроки',
        abonements: 'Абонементи',
        credits: 'Заборгованості',
        statistics: 'Статистика'
    },

    dashboard: 'Панель Управління',

    pages: {
        users: {
            title: 'Користувачі'
        },

        manageUsers: {
            errors: {
                noEmail: 'Введіть email',
                noPassword: 'Введіть пароль',
                invalidEmail: 'Некоректний email',
                confirmPassword: 'Паролі не співпадають',
                noRole: 'Виберіть рівень доступу',
                noFirstName: 'Введіть Ім\'я',
                noSecondName: 'Введіть прізвище',
                noAge: 'Введіть вік',
                noPhone: 'Введіть телефон',
                noBalance: 'Введіть баланс',
                noDisciplines: 'Виберіть диципліни',
                noDay: 'Виберіть День',
                noTime: 'Виберіть Час',
                noRoom: 'Виберіть Клас',
                noType: 'Виберіть Тип заняття',
                noTeacher: 'Виберіть Вчителя',
                notTeacherWorkTime: 'Це не робочий час цього вчителя',
                noQuantity: 'Не встановлено кількість',
                noPrice: 'Не встановлено ціну',
                noDate: "Виберіть дату"

            },

            inputFields: {
                passwordLabel: 'Пароль',
                confirmPasswordLabel: 'Повторити пароль',
                rolesLabel: 'Рівні Доступу'
            }
        }
    }
};

export default ua;