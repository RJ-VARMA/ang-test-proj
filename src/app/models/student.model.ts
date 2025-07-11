export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: Date;
  address: Address;
  enrollmentDate: Date;
  status: StudentStatus;
  courses: Course[];
  gpa?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  GRADUATED = 'graduated',
  SUSPENDED = 'suspended'
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  instructor: string;
  schedule: CourseSchedule;
  enrollmentCount: number;
  maxEnrollment: number;
  status: CourseStatus;
}

export interface CourseSchedule {
  days: string[];
  startTime: string;
  endTime: string;
  room: string;
}

export enum CourseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed'
}