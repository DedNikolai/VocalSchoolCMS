const ua = {
    menu: {
        main: 'Головна',
        users: 'Користувачі',
        timetable: 'Розклад',
        students: 'Учні',
        teachers: 'Вчителі'
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