import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Student } from '../models/student.model';
import { PaginatedResponse, QueryParams } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private endpoint = '/students';

  constructor(private apiService: ApiService) {}

  getStudents(params?: QueryParams): Observable<PaginatedResponse<Student>> {
    return this.apiService.getPaginated<Student>(this.endpoint, params);
  }

  getStudent(id: string): Observable<Student> {
    return this.apiService.get<Student>(`${this.endpoint}/${id}`);
  }

  createStudent(student: Partial<Student>): Observable<Student> {
    return this.apiService.post<Student>(this.endpoint, student);
  }

  updateStudent(id: string, student: Partial<Student>): Observable<Student> {
    return this.apiService.put<Student>(`${this.endpoint}/${id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  enrollInCourse(studentId: string, courseId: string): Observable<void> {
    return this.apiService.post<void>(`${this.endpoint}/${studentId}/enroll`, { courseId });
  }

  unenrollFromCourse(studentId: string, courseId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${studentId}/enroll/${courseId}`);
  }
}