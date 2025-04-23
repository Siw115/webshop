import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from "../auth/auth.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentRoute: string = '';
  roles: string[] = [];

  constructor(
      private authService: AuthService,
      private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.roles = this.authService.getUserRoles();
    console.log('User roles:', this.roles); // Add this line to debug roles
  }

  isAdmin(): boolean {
    const isAdmin = this.roles.includes('ROLE_ADMIN');
    console.log('Is admin:', isAdmin);
    return isAdmin;
  }

}
