import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  pendingTasks: number;
  thisMonth: number;
}

interface RecentActivity {
  id: string;
  description: string;
  timestamp: Date;
  type: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  stats: DashboardStats = {
    totalStudents: 0,
    activeCourses: 0,
    pendingTasks: 0,
    thisMonth: 0
  };
  recentActivities: RecentActivity[] = [];
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    // Mock data - replace with actual API calls
    this.stats = {
      totalStudents: 1247,
      activeCourses: 23,
      pendingTasks: 8,
      thisMonth: 156
    };

    this.recentActivities = [
      {
        id: '1',
        description: 'New student John Doe enrolled in Computer Science',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        type: 'enrollment'
      },
      {
        id: '2',
        description: 'Course "Advanced Mathematics" updated by Prof. Smith',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        type: 'course_update'
      },
      {
        id: '3',
        description: 'Grade submitted for "Physics 101" by Dr. Johnson',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        type: 'grade_submission'
      },
      {
        id: '4',
        description: 'New assignment created for "Web Development"',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        type: 'assignment'
      },
      {
        id: '5',
        description: 'Student Sarah Wilson completed "Database Design" course',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        type: 'completion'
      }
    ];
  }
}