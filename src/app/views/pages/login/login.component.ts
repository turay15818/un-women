import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../Service/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../Service/user.service';
import { ForgotPasswordService } from '../../../../Service/forgetPassword.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  successMessage: string = '';
  errorMessage: string = '';


  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  // errorMessage: string = '';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private forgotPasswordService: ForgotPasswordService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openXl(content: any) {
    this.modalService.open(content, { size: 'md' });
  }

  sendResetRequest() {
    this.forgotPasswordService.sendResetRequest(this.email).subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error.error;
        this.successMessage = '';
      }
    );
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';


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
          this.errorMessage = 'Incorrect password';
          console.log('No token in login response');
        }
      },
      (error) => {
        this.errorMessage = 'Incorrect Password Please Try again';
        console.error('Login error:', error);
      }
    ).add(() => {
      this.isLoading = false;
    });
  }
  







 

  










}
