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
  isLoading: boolean = false;
  loadingMessage = 'Creating your Business Profile .....';

  constructor(
    private userService: UserService,
    private businessProfileService: BusinessProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.businessProfileForm = this.formBuilder.group({
      // businessSize: ['', null],
      // tagLine: ['', null],
      // businessName: ['', null],
      // businessAddress: ['', null],
      // businessBiography: ['', null],
      // businessCategory: ['', null],
      businessName: ['', Validators.required],
      businessSize: ['', Validators.required],
      businessPhoneNo: ['', Validators.required],
      businessEmail: ['', Validators.required],
      tagLine: ['', Validators.required],
      businessAddress: ['', Validators.required],
      businessBiography: ['', Validators.required],
      businessCategory: ['', Validators.required],
      logo: [null],
      certificate: [null],
    });
  }
  onSubmit() {
    this.isLoading = true;
    this.loadingMessage = 'Creating your Business Profile .....';
    if (this.businessProfileForm.invalid) {
      return;
    }

    const formData = this.getFormDataFromForm();

    this.businessProfileService
      .createBusinessProfile(formData)
      .subscribe(
        (response) => {
          console.log('Business Profile created successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error creating Business Profile:', error);
        }
      )
      .add(() => {
        this.isLoading = false;
        this.loadingMessage = '';
      });
  }

  onEditSubmit() {
    this.isLoading = true;
    this.loadingMessage = 'Updating your Business Profile .....';
    // if (this.businessProfileForm.invalid) {
    //   return;
    // }

    const formData = this.getFormDataFromForm();

    this.businessProfileService
      .editBusinessProfile(formData)
      .subscribe(
        (response) => {
          console.log('Business Profile Updated successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error Editing Business Profile:', error);
        }
      )
      .add(() => {
        this.isLoading = false;
        this.loadingMessage = '';
      });
  }
  

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const maxSize = 4.5 * 1024 * 1024;

      if (file.size <= maxSize) {
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
      } else {
        alert('Please select an image that is less than 5MB in size.');
        event.target.value = '';
      }
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

  // ngOnInit(): void {
  //   this.userService.getUserData().subscribe(
  //     (userData) => {
  //       this.userData = userData;
  //     },
  //     (error) => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );

  //   this.userService.getUserBusinessProfileById().subscribe(
  //     (Data) => {
  //       this.Data = Data;
  //       console.log('Bo na d data this;', Data);
  //     },
  //     (error) => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }


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
      (data) => {
        this.Data = data;
        console.log('Business profile data:', data);
  
        // Set the initial value for the 'businessName' form control
        this.businessProfileForm.patchValue({
          businessName: data[0].businessName,
          businessSize: data[0].businessSize,
          businessAddress: data[0].businessAddress,
          businessBiography: data[0].businessBiography,
          businessCategory: data[0].businessCategory,
          tagLine: data[0].tagLine,
          registredCertificate: data[0].registredCertificate,
          businessLogo: data[0].businessLogo,
        
        });
      },
      (error) => {
        console.error('Error fetching business profile data:', error);
      }
    );
  }
  




}
