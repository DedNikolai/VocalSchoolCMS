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
  (id, date_created, date_modified, email, photo, phone, first_name, last_name, age, pay_balance)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'student1@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '063-438-01-90', 'Ivan', 'Ivanov', 36, 500),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'student2@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '093-825-01-90', 'Andrey', 'Sidorov', 30, 400);


INSERT INTO taechers
  (id, date_created, date_modified, email, photo, phone, first_name, last_name, age)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'oks.mal@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '063-438-01-90', 'Oksana', 'Malitskaya', 36),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'ivanova@ukr.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '093-825-01-90', 'Alina', 'Ivanova', 30);

INSERT INTO students_teachers
  (student_id, teacher_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1);

INSERT INTO teacher_discipline
  (teacher_id, discipline)
VALUES
  (1, 'VOCAL'),
  (1, 'SOLFEGGIO'),
  (2, 'VOCAL');

INSERT INTO lessons
  (id, date_created, date_modified, teacher_id, student_id, room, discipline, lesson_type, lesson_day, time_hour, time_minutes, duration)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 1, 'ROOM1', 'VOCAL', 'MAN', 'MONDAY', 12, 0, 60),
  (4, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 2, 'ROOM1', 'VOCAL', 'MAN', 'MONDAY', 13, 0, 60),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 2, 'ROOM2', 'SOLFEGGIO', 'MAN', 'MONDAY', 14, 0, 60),
  (3, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 2, 1, 'ROOM3', 'VOCAL', 'CHILD', 'FRIDAY', 10, 30, 30);

INSERT INTO teacher_worktime
  (id, date_created, date_modified, lesson_day, start_time, end_time, teacher)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'MONDAY', '09:00', '15:00', 1),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 'TUESDAY', '09:00', '19:00', 1);

INSERT INTO prices
  (id, date_created, date_modified, teacher_id, discipline, price_value, lesson_type)
VALUES
  (1, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 'VOCAL', 500, 'MAN'),
  (2, '2020-01-29 21:30:00', '2020-01-29 21:30:00', 1, 'VOCAL', 300, 'CHILD');


