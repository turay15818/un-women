import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../Service/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}
  onSubmit() {
    this.authenticationService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.userService.getUserData().subscribe(
            (userData) => {
              const userRole = userData.role;
              console.log('This is the role', userRole);
              if (userRole === 'customer') {
                this.router.navigate(['/business']);
              } else {
                this.router.navigate(['/dashboard']);
              }

              this.userService.setUser(userData);
            },
            (error) => {
              console.error('Error fetching user data:', error);
            }
          );
        } else {
          console.log('No token in login response');
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
