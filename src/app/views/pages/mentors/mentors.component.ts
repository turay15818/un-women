import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MentorProfileService } from 'src/Service/mentorProfile.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['../homepage/homepage.component.css'],
})
export class MentorsComponent {
  Data: any;
  productDetails: any;
  productImages: any;

  navigateToProductDetails(uuid: string) {
    this.router.navigate(['mentors-details', uuid]);
  }

  constructor(
    private mentorProfileServices: MentorProfileService,
    private router: Router
  ) {}
  ngOnInit() {
    this.mentorProfileServices.getMentorProfile().subscribe(
      (data) => {
        this.Data = data;
        console.log('Data:', data);
      },
      (error) => {
        console.error('Error fetching mentor profile:', error);
      }
    );
  }
}
