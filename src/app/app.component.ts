import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Student Management System';
  showHeader = true;
  showFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Hide header/footer on auth pages
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const authRoutes = ['/login', '/register', '/forgot-password'];
        this.showHeader = !authRoutes.includes(event.url);
        this.showFooter = !authRoutes.includes(event.url);
      });
  }
}