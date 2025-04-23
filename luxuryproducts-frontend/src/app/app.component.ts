import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { HttpClient } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { UserService } from './services/user.service';
import { CustomUser } from './models/customuser.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProductsComponent, AuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Powerflex Essentials';

  constructor(private userService: UserService, private router: Router) {

  }

  isLoggedIn: boolean = false;
  user: CustomUser | null = null;


  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userService.getUserInfo().subscribe(user => {
        this.user = user;
      });
    }
  }
}
