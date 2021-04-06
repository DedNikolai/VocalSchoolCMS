create sequence hibernate_sequence start 1 increment 1

create table if not exists abonements (
    id int8 not null,
    date_created date,
    date_modified date,
    discipline varchar(255),
    price int4,
    quantity int4,
    transfered_quantity int4,
    used_quantity int4,
    student_id int8,
    primary key (id)
);

create table if not exists confirmed_lesson (
  id int8 not null,
  date_created date,
  date_modified date,
  paid boolean default false,
  lesson_date date,
  price int4,
  abonement int8,
  lesson_id int8,
  teacher int8,
  primary key (id)
);

create table if not exists credits (
  id int8 not null,
  date_created date,
  date_modified date,
  lesson_date date,
  lesson_time varchar(255),
  lesson_id int8,
  student int8,
  teacher int8,
  primary key (id)
);

create table if not exists deleted_lesson (
  id int8 not null,
  date_created date,
  date_modified date,
  is_used boolean default false,
  lesson_date date,
  reason varchar(255),
  abonement int8,
  lesson_id int8,
  primary key (id)
);


create table if not exists lessons (
  id int8 not null,
  date_created date,
  date_modified date,
  current_studen_balance int4,
  lesson_day varchar(255),
  discipline varchar(255),
  duration int4,
  is_active boolean,
  is_single boolean default false,
  lesson_finish_date date,
  lesson_start_date date,
  room varchar(255),
  status int4,
  lesson_time varchar(255),
  lesson_type varchar(255),
  student_id int8,
  teacher_id int8,
  primary key (id)
);

create table if not exists password_reset_token (
  id int8 not null,
  expiry_date timestamp,
  token varchar(255),
  user_id int8 not null,
  primary key (id)
);

create table if not exists prices (
  id int8 not null,
  date_created date,
  date_modified date,
  discipline varchar(255),
  price_value int4,
  lesson_type varchar(255),
  teacher_id int8 not null,
  primary key (id)
);

create table if not exists students (
  id int8 not null,
  date_created date,
  date_modified date,
  age int4,
  email varchar(255),
  first_name varchar(255),
  last_name varchar(255),
  parent varchar(255),
  phone varchar(255),
  photo varchar(255),
  primary key (id)
);

create table if not exists taechers (
  id int8 not null,
  date_created date,
  date_modified date,
  age int4,
  email varchar(255),
  first_name varchar(255),
  last_name varchar(255),
  phone varchar(255),
  photo varchar(255),
  primary key (id)
);

create table if not exists teacher_discipline (
  teacher_id int8
  not null,
  discipline varchar(255)
);

create table if not exists teacher_worktime (
  id int8 not null,
  date_created date,
  date_modified date,
  lesson_day varchar(255),
  end_time varchar(255),
  start_time varchar(255),
  teacher int8,
  primary key (id)
);

create table if not exists transfer_lessons (
  id int8 not null,
  date_created date,
  date_modified date,
  lesson_day varchar(255),
  is_active boolean,
  lesson_date date,
  room varchar(255),
  status int4,
  transfer_date date,
  transfer_time varchar(255),
  abonement int8,
  lesson_id int8,
  teacher int8,
  primary key (id)
);

create table if not exists users (
  id int8 not null,
  date_created date,
  date_modified date,
  email varchar(255),
  password varchar(255),
  primary key (id)
);

create table if not exists users_roles (
  user_id int8 not null,
  role varchar(255)
);

alter table abonements
  add constraint FKjgu9afbg6gc3tshu3abd07t3w
  foreign key (student_id) references students;

alter table confirmed_lesson
  add constraint FKq6i2cfn24ko3g4typd844lbf9
  foreign key (abonement) references abonements;

alter table confirmed_lesson
  add constraint FKsmor0oapn3fhfjfynro0erj0d
  foreign key (lesson_id) references lessons;

alter table confirmed_lesson
  add constraint FK45r2vm3upujniw2660hll6tlf
  foreign key (teacher) references taechers;

alter table credits
  add constraint FKd3dvsw6rgi88r3p6ofkkh2ld4
  foreign key (lesson_id) references lessons;

alter table credits
  add constraint FKplbgwj2moldbbu57qm84gv0jf
  foreign key (student) references students;

alter table credits
  add constraint FKldk0s1mfam9y9n7naxqinn7jx
  foreign key (teacher) references taechers;

alter table deleted_lesson
  add constraint FK4u23t3bjeabbr5idfo16nb4gw
  foreign key (abonement) references abonements;

alter table deleted_lesson
  add constraint FKshv8hcayx72pcy8h6pcmq4aw4
  foreign key (lesson_id) references lessons;

alter table lessons
  add constraint FKl0r9v8xmhfoc6541lk18v5juh
  foreign key (student_id) references students;

alter table lessons
  add constraint FKt6jaoub8i2fi2uu88vr0molpg
  foreign key (teacher_id) references taechers;

alter table password_reset_token
  add constraint FK83nsrttkwkb6ym0anu051mtxn
  foreign key (user_id) references users;

alter table prices
  add constraint FKqs52fqnmfas76kdwo2u9vak3d
  foreign key (teacher_id) references taechers;

alter table teacher_discipline
  add constraint FKcn1q1cu7i60dpw2d5tjfnbggx
  foreign key (teacher_id) references taechers;

alter table teacher_worktime
  add constraint FKr76y09uotqv2yovmfp6utwxyj
  foreign key (teacher) references taechers;

alter table transfer_lessons
  add constraint FKq7tskb8eh83s3ljdko93hseef
  foreign key (abonement) references abonements;

alter table transfer_lessons
  add constraint FKj03nemwb0780dnvb5v248x8hj
  foreign key (lesson_id) references lessons;

alter table transfer_lessons
  add constraint FK8vol9mfmgexuswyka20jn1b4q
  foreign key (teacher) references taechers;

alter table users_roles
  add constraint FK2o0jvgh89lemvvo17cbqvdxaa
  foreign key (user_id) references users;