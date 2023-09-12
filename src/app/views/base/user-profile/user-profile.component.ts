import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessProfileService } from 'src/Service/business-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  businessProfileForm: FormGroup;
  userData: any;
  Data: any;

  constructor(
    private userService: UserService,
    private businessProfileService: BusinessProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.businessProfileForm = this.formBuilder.group({
      businessSize: ['', Validators.required],
      tagLine: ['', Validators.required],
      businessName: ['', Validators.required],
      businessAddress: ['', Validators.required],
      businessBiography: ['', Validators.required],
      businessCategory: ['', Validators.required],
      logo: [null],
      certificate: [null],
    });
  }
  onSubmit() {
    if (this.businessProfileForm.invalid) {
      return;
    }

    const formData = this.getFormDataFromForm();

    this.businessProfileService.createBusinessProfile(formData).subscribe(
      (response) => {
        console.log('Business Profile created successfully:', response);
        this.router.navigate(['/add-product']);
      },
      (error) => {
        console.error('Error creating Business Profile:', error);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        if (event.target.id === 'logo') {
          this.businessProfileForm.get('logo')!.setValue(file);
        } else if (event.target.id === 'certificate') {
          this.businessProfileForm.get('certificate')!.setValue(file);
        }
        console.log(fileContent);
      };

      reader.readAsDataURL(file);
    }
  }

  private getFormDataFromForm(): FormData {
    const formData = new FormData();
    const formControls = this.businessProfileForm.controls;
    for (const controlName in formControls) {
      if (formControls.hasOwnProperty(controlName)) {
        const control = formControls[controlName];
        if (control instanceof File) {
          formData.append(controlName, control);
        } else {
          formData.append(controlName, control.value);
        }
      }
    }
    return formData;
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (userData) => {
        this.userData = userData;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.userService.getUserBusinessProfileById().subscribe(
      (Data) => {
        this.Data = Data;
        console.log('Bo na d data this;', Data);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
