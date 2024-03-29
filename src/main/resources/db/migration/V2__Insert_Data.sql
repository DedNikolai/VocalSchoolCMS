INSERT INTO users
  (id, date_created, date_modified, email, password)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'nikolai.blashchuk@gmail.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO'),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'oks.mal@ukr.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO'),
  (3, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'ivanova@ukr.com', '$2a$04$kDaKwBckpCiw/PFvV4qpqOdMl9oypQVKaXvANn.oeKC9xrGiYdfmO');

INSERT INTO users_roles
  (user_id, role)
VALUES
  (2, 'TEACHER'),
  (3, 'TEACHER'),
  (2, 'ADMIN'),
  (1, 'SUPER_ADMIN');

INSERT INTO students
  (id, date_created, date_modified, email, photo, phone, first_name, last_name, age)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'student1@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '063-438-01-90', 'Ivan', 'Ivanov', 36),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'student2@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '093-825-01-90', 'Andrey', 'Sidorov', 30),
  (3, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'student3@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '099-111-01-90', 'Petya', 'Kakin', 23);


INSERT INTO taechers
  (id, date_created, date_modified, email, photo, phone, first_name, last_name, age)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'oks.mal@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '063-438-01-90', 'Oksana', 'Malitskaya', 36),
  (3, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'okіш.mal@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '063-000-01-90', 'Tetiana', 'Petriv', 26),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'ivanova@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '093-825-01-90', 'Alina', 'Ivanova', 30);

INSERT INTO teacher_discipline
  (teacher_id, discipline)
VALUES
  (1, 'VOCAL'),
  (1, 'SOLFEGGIO'),
  (3, 'VOCAL'),
  (2, 'VOCAL');

INSERT INTO lessons
  (id, date_created, date_modified, teacher_id, student_id, room, discipline, lesson_type, lesson_day, lesson_time, duration, is_single, is_active, lesson_start_date, lesson_finish_date)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 1, 'ROOM1', 'VOCAL', 'MAN', 'MONDAY', '12:00', 60, false, true, '2021-02-15', null),
  (4, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 2, 'ROOM1', 'VOCAL', 'MAN', 'MONDAY', '13:00', 60, false, true, '2021-02-15', null),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 2, 2, 'ROOM2', 'SOLFEGGIO', 'MAN', 'MONDAY', '14:00', 60, false, true, '2021-02-15', '2021-03-29'),
  (3, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 2, 1, 'ROOM3', 'VOCAL', 'CHILD', 'FRIDAY', '10:30', 30, false, true, '2021-03-22', null),
  (5, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 2, 3, 'ROOM4', 'VOCAL', 'MAN', 'MONDAY', '16:00', 60, true, true, '2021-03-29', '2021-03-29');

INSERT INTO teacher_worktime
  (id, date_created, date_modified, lesson_day, start_time, end_time, teacher)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'MONDAY', '09:00', '15:00', 1),
  (4, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'MONDAY', '09:00', '18:00', 2),
  (5, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'THURSDAY', '09:00', '16:00', 1),
  (3, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'MONDAY', '09:00', '18:00', 3),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'TUESDAY', '09:00', '19:00', 1);

INSERT INTO prices
  (id, date_created, date_modified, teacher_id, discipline, price_value, lesson_type)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 'VOCAL', 150, 'MAN'),
  (3, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 2, 'VOCAL', 250, 'MAN'),
  (5, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 3, 'VOCAL', 150, 'MAN'),
  (4, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 2, 'VOCAL', 150, 'CHILD'),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 'VOCAL', 250, 'CHILD');

INSERT INTO abonements
  (id, date_created, date_modified, student_id, quantity, price, discipline, transfered_quantity, used_quantity)
VALUES
  (1, '2020-08-24 21:30:00', '2020-01-29 21:30:00', 1, 4, 1300, 'VOCAL', 1, 3),
  (2, '2020-01-29 21:30:00', '2020-02-29 21:30:00', 2, 8, 2000, 'VOCAL', 2, 2);

INSERT INTO confirmed_lesson
  (id, date_created, date_modified, price, teacher, lesson_id, lesson_date, abonement, paid)
VALUES
  (1, '2020-08-24 21:30:00', '2020-01-29 21:30:00', 300, 1, 1, '2020-08-24', 1, false),
  (3, '2020-08-24 21:30:00', '2020-01-29 21:30:00', 300, 1, 1, '2020-02-24', 1, false),
  (2, '2020-01-29 21:30:00', '2020-02-29 21:30:00', 500, 2, 1, '2020-08-25', 1, false);

INSERT INTO deleted_lesson
  (id, date_created, date_modified, lesson_id, lesson_date, reason, abonement, is_used)
VALUES
  (1, '2020-08-24 21:30:00', '2020-01-29 21:30:00', 1, '2020-08-24', 'puk-puk', 1, false),
  (3, '2020-08-24 21:30:00', '2020-01-29 21:30:00', 2, '2020-02-24', 'puk-puk', 2, true ),
  (2, '2020-01-29 21:30:00', '2020-02-29 21:30:00', 3, '2020-08-25', 'puk-puk', null, false);
