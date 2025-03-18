import { Exclude } from 'class-transformer';
import { Course } from 'src/course/course.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../enums/role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Course, (course) => course.favoriteCourses)
  @JoinTable({ name: 'favorite_courses' })
  favoriteCourses: Course[];

  @ManyToMany(() => Course, (course) => course.enrolledCourses)
  @JoinTable({ name: 'enrolled_courses' })
  enrolledCourses: Course[];
}
