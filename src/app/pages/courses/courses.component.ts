import { Component, OnInit } from '@angular/core';

import { Course, CourseStatus } from '../../models/student.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  // Expose Math to template
  Math = Math;

  constructor() {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    // Mock data - replace with actual API call
    this.courses = [
      {
        id: '1',
        code: 'CS101',
        name: 'Introduction to Computer Science',
        description: 'A comprehensive introduction to computer science fundamentals, covering programming basics, algorithms, and data structures.',
        credits: 3,
        instructor: 'Dr. Sarah Johnson',
        schedule: {
          days: ['Mon', 'Wed', 'Fri'],
          startTime: '09:00',
          endTime: '10:30',
          room: 'Room 101'
        },
        enrollmentCount: 28,
        maxEnrollment: 30,
        status: CourseStatus.ACTIVE
      },
      {
        id: '2',
        code: 'MATH201',
        name: 'Advanced Mathematics',
        description: 'Advanced mathematical concepts including calculus, linear algebra, and discrete mathematics for computer science applications.',
        credits: 4,
        instructor: 'Prof. Michael Smith',
        schedule: {
          days: ['Tue', 'Thu'],
          startTime: '14:00',
          endTime: '16:00',
          room: 'Room 205'
        },
        enrollmentCount: 22,
        maxEnrollment: 25,
        status: CourseStatus.ACTIVE
      },
      {
        id: '3',
        code: 'PHYS101',
        name: 'Physics Fundamentals',
        description: 'Basic principles of physics including mechanics, thermodynamics, and electromagnetism.',
        credits: 3,
        instructor: 'Dr. Emily Davis',
        schedule: {
          days: ['Mon', 'Wed'],
          startTime: '11:00',
          endTime: '12:30',
          room: 'Lab 301'
        },
        enrollmentCount: 18,
        maxEnrollment: 20,
        status: CourseStatus.ACTIVE
      },
      {
        id: '4',
        code: 'ENG102',
        name: 'Technical Writing',
        description: 'Development of technical writing skills for scientific and engineering documentation.',
        credits: 2,
        instructor: 'Prof. Robert Wilson',
        schedule: {
          days: ['Fri'],
          startTime: '13:00',
          endTime: '15:00',
          room: 'Room 150'
        },
        enrollmentCount: 15,
        maxEnrollment: 20,
        status: CourseStatus.COMPLETED
      },
      {
        id: '5',
        code: 'CS301',
        name: 'Database Systems',
        description: 'Comprehensive study of database design, implementation, and management systems.',
        credits: 3,
        instructor: 'Dr. Lisa Anderson',
        schedule: {
          days: ['Tue', 'Thu'],
          startTime: '10:00',
          endTime: '11:30',
          room: 'Lab 201'
        },
        enrollmentCount: 25,
        maxEnrollment: 30,
        status: CourseStatus.ACTIVE
      },
      {
        id: '6',
        code: 'CS401',
        name: 'Software Engineering',
        description: 'Advanced software development methodologies, project management, and team collaboration.',
        credits: 4,
        instructor: 'Prof. David Brown',
        schedule: {
          days: ['Mon', 'Wed', 'Fri'],
          startTime: '15:00',
          endTime: '16:30',
          room: 'Room 301'
        },
        enrollmentCount: 20,
        maxEnrollment: 25,
        status: CourseStatus.ACTIVE
      }
    ];
  }
}