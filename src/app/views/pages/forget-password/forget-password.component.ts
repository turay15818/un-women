import { Component } from '@angular/core';
import { ForgotPasswordService } from '../../../../Service/forgetPassword.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    config: NgbModalConfig,
    private router: Router,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }



  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  sendResetRequest() {
    this.forgotPasswordService.sendResetRequest(this.email).subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      (error) => {
        this.errorMessage = error.error.error;
        this.successMessage = '';
      }
    );
  }
}
