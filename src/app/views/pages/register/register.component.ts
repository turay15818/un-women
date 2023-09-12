import { Component } from '@angular/core';
import { UserService } from '../../../../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: any = {};
  selectedFile: File | undefined;

  constructor(private userService: UserService, private router: Router) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedFile = inputElement.files?.[0];
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      return;
    }
    this.userService.createUser(this.user, this.selectedFile).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
