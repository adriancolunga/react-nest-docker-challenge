import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { User } from '../user/user.entity';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Course } from './course.entity';
import { CourseQuery } from './course.query';

@Injectable()
export class CourseService {
  async save(createCourseDto: CreateCourseDto): Promise<Course> {
    return await Course.create({
      ...createCourseDto,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(courseQuery: CourseQuery): Promise<Course[]> {
    Object.keys(courseQuery).forEach((key) => {
      courseQuery[key] = ILike(`%${courseQuery[key]}%`);
    });
    return await Course.find({
      where: courseQuery,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Course> {
    const course = await Course.findOne(id);
    if (!course) {
      throw new HttpException(
        `Could not find course with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findById(id);
    return await Course.create({ id: course.id, ...updateCourseDto }).save();
  }

  async delete(id: string): Promise<string> {
    const course = await this.findById(id);
    await Course.delete(course);
    return id;
  }

  async count(): Promise<number> {
    return await Course.count();
  }

  async addFavoriteCourse(userId: string, courseId: string): Promise<Course> {
    const course = await this.findById(courseId);
    const user = await User.findOne(
      { id: userId },
      { relations: ['favoriteCourses'] },
    );
    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    user.favoriteCourses.push(course);

    await User.save(user);
    return course;
  }

  async delFavoriteCourse(userId: string, courseId: string): Promise<void> {
    const user = await User.findOne(
      { id: userId },
      { relations: ['favoriteCourses'] },
    );
    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newFavs = user.favoriteCourses.filter(({ id }) => id !== courseId);
    user.favoriteCourses = newFavs;

    await User.save(user);
  }

  async findFavorites(id: string) {
    return (
      await Course.find({ relations: ['favoriteCourses'] })
    ).filter(({ favoriteCourses }) =>
      favoriteCourses.some(({ id: userId }) => userId === id),
    );
  }

  async enrollCourse(userId: string, courseId: string): Promise<Course> {
    const course = await this.findById(courseId);
    const user = await User.findOne(
      { id: userId },
      { relations: ['enrolledCourses'] },
    );
    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    user.enrolledCourses.push(course);

    await User.save(user);
    return course;
  }

  async unenrollCourse(userId: string, courseId: string): Promise<void> {
    //control de que el curso existe
    await this.findById(courseId);

    const user = await User.findOne(
      { id: userId },
      { relations: ['enrolledCourses'] },
    );
    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newEnrolls = user.enrolledCourses.filter(({ id }) => id !== courseId);
    user.enrolledCourses = newEnrolls;

    await User.save(user);
  }

  async enrolledList(id: string): Promise<Course[]> {
    return (
      await Course.find({ relations: ['enrolledCourses'] })
    ).filter(({ enrolledCourses }) =>
      enrolledCourses.some(({ id: userId }) => userId === id),
    );
  }
}
