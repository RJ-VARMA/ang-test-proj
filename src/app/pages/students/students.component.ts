import { Component, OnInit } from '@angular/core';

import { Student, StudentStatus } from '../../models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  searchTerm = '';
  statusFilter = '';
  currentPage = 1;
  pageSize = 10;
  totalStudents = 0;
  totalPages = 0;

  // Expose Math to template
  Math = Math;

  constructor() {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    // Mock data - replace with actual API call
    this.students = [
      {
        id: '1',
        studentId: 'STU001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: new Date('1998-05-15'),
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        enrollmentDate: new Date('2020-09-01'),
        status: StudentStatus.ACTIVE,
        courses: [],
        gpa: 3.75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        studentId: 'STU002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        phone: '+1 (555) 987-6543',
        dateOfBirth: new Date('1999-03-22'),
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        enrollmentDate: new Date('2021-01-15'),
        status: StudentStatus.ACTIVE,
        courses: [],
        gpa: 3.92,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        studentId: 'STU003',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@email.com',
        dateOfBirth: new Date('1997-11-08'),
        address: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        enrollmentDate: new Date('2019-08-20'),
        status: StudentStatus.GRADUATED,
        courses: [],
        gpa: 3.45,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.totalStudents = this.students.length;
    this.totalPages = Math.ceil(this.totalStudents / this.pageSize);
  }

  onSearch(): void {
    // Implement search functionality
    console.log('Searching for:', this.searchTerm);
  }

  onFilterChange(): void {
    // Implement filter functionality
    console.log('Filter changed:', this.statusFilter);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadStudents();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);
    
    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}