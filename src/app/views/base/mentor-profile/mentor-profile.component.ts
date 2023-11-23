import { CreateMentorProfileService } from '../../../../Service/createMentorProfile.service';
import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Import necessary modules
import { UserService } from 'src/Service/user.service';
import { FormBuilder } from '@angular/forms';
import { MentorProfileService } from '../../../../Service/mentorProfile.service';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css'],

})
export class MentorProfileComponent {
  // mentorProfile: MentorProfile = new MentorProfile();
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  loadingMessage = 'Creating your Product...';
  mentorProfileForm: FormGroup;
  userData: any;
  Data: any;
  description: string = '';
  skills: string = '';
  experience: string = '';
  education: string = '';
  languages: string = '';
  availability: string = '';
  linkedinProfile: string = '';
  website: string = '';
  noOfMentee: number = 0;
  isSubmitting: boolean = false;
  constructor(
    private mentorProfileService: CreateMentorProfileService,
    private userService: UserService,
    private mentorProfileServices: MentorProfileService
  ) {
    this.mentorProfileForm = new FormGroup({
      discription: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      languages: new FormControl('', [Validators.required]),
      availability: new FormControl('', [Validators.required]),
      linkedinProfile: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      noOfMentee: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (userData) => {
        this.userData = userData;
        console.log(userData, 'This is the data');
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.mentorProfileServices.getUserMentorProfileById().subscribe(
      (Data) => {
        this.Data = Data;
        console.log('Bo na d data this;', Data);
      },
      (error) => {
        this.isSubmitting = false;
        console.error('Error fetching user data:', error);
      }
    );
  }

  submitForm() {
    if (this.isSubmitting) {
      // Prevent multiple submissions
      return;
    }

    this.isSubmitting = true;
    this.isLoading = true;
    this.loadingMessage = 'Creating My Profile ...';
    this.successMessage = '';
    this.errorMessage = '';

    const formData = this.mentorProfileForm.value;

    this.mentorProfileService.createMentorProfile(formData).subscribe(
      (response) => {
        console.log('Form Data:', this.mentorProfileForm.value);
        console.log('Mentor Profile created successfully:', response);
        this.isLoading = false;
        this.successMessage = 'Mentor Profile created successfully';
      },
      (error) => {
        console.error('Error creating Mentor Profile:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to create Mentor Profile. Please try again';
      }
    );
  }
}
