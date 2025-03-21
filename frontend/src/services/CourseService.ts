import Course from '../models/course/Course';
import CourseQuery from '../models/course/CourseQuery';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import UpdateCourseRequest from '../models/course/UpdateCourseRequest';
import apiService from './ApiService';

class UserService {
  async save(createCourseRequest: CreateCourseRequest): Promise<void> {
    await apiService.post('/api/courses', createCourseRequest);
  }

  async findAll(courseQuery: CourseQuery): Promise<Course[]> {
    return (
      await apiService.get<Course[]>('/api/courses', { params: courseQuery })
    ).data;
  }

  async findOne(id: string): Promise<Course> {
    return (await apiService.get<Course>(`/api/courses/${id}`)).data;
  }

  async update(
    id: string,
    updateCourseRequest: UpdateCourseRequest,
  ): Promise<void> {
    await apiService.put(`/api/courses/${id}`, updateCourseRequest);
  }

  async delete(id: string): Promise<void> {
    await apiService.delete(`/api/courses/${id}`);
  }

  async addFavorite(courseId: string): Promise<void> {
    await apiService.post(`/api/courses/addFavorite/${courseId}`);
  }

  async removeFavorite(courseId: string): Promise<void> {
    await apiService.patch(`/api/courses/delFavorite/${courseId}`);
  }

  async favoritesList(): Promise<Course[]> {
    return (await apiService.get('/api/courses/favorites')).data;
  }

  async enroll(courseId: string): Promise<void> {
    await apiService.post(`/api/courses/enroll/${courseId}`);
  }

  async unenroll(courseId: string): Promise<void> {
    await apiService.patch(`/api/courses/unenroll/${courseId}`);
  }

  async enrolledList(): Promise<Course[]> {
    return (await apiService.get('/api/courses/enrolled')).data;
  }
}

export default new UserService();
