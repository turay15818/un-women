// password-reset.component.ts
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from '../../../../Service/resetPassword.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

interface TokenParams {
  token: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  validToken = false;
  password: string = '';
  confPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {}

  hasError(field: NgModel, errorName: string): boolean {
    return field.hasError(errorName);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.token = params.token;
      this.validateToken();
    });
  }

  validateToken() {
    this.resetPasswordService.checkTokenValidity(this.token).subscribe(
      (response: any) => {
        this.validToken = true;
      },
      (error) => {
        // Handle invalid or expired token
        this.validToken = false;
      }
    );
  }

  resetPassword() {
    this.isLoading = true;
    this.errorMessage = '';

    this.resetPasswordService
      .resetPassword(this.token, this.password)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = 'Password does not match';
          console.error('Login error:', error);
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }
}
