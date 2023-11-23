import { Component } from '@angular/core';
import { UserService } from '../../../../Service/user.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: any = {};
  selectedFile: File | undefined;
  isLoading: boolean = false;
  loadingMessage = 'Creating your Account .....';

  constructor(private userService: UserService, private router: Router) {}
  hasError(field: NgModel, errorName: string): boolean {
    return field.hasError(errorName);
  }

  isPasswordValid(field: NgModel): boolean {
    const valid =
      !this.hasError(field, 'required') &&
      !this.hasError(field, 'minlength') &&
      !this.hasError(field, 'pattern');
    console.log('Is Password Valid:', valid);
    return valid;
  }

  // onFileSelected(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.selectedFile = inputElement.files?.[0];
  // }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    const maxSize = 4.5 * 1024 * 1024; // 5MB maximum size

    if (selectedFile && selectedFile.size <= maxSize) {
      this.selectedFile = selectedFile;
    } else if (selectedFile) {
      alert('Please select an image that is less than 5MB in size.');
      inputElement.value = '';
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.loadingMessage = 'Creating your Account .....';
    if (!this.selectedFile) {
      return;
    }
    this.userService
      .createUser(this.user, this.selectedFile)
      .subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      )
      .add(() => {
        this.isLoading = false;
        this.loadingMessage = '';
      });
  }
}
