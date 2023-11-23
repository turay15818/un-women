import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MentorProfileService } from 'src/Service/mentorProfile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.css'],
})
export class MentorDetailsComponent {
  Data: any;
  uuid: any;
mentorDetails: any;
  productImages: any;


  constructor(
    private mentorProfileDetails: MentorProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.uuid = params.get('uuid') ?? '';
          return this.mentorProfileDetails.getMentorProfileById(this.uuid);
        })
      )
      .subscribe((mentorDetailsData) => {
        this.mentorDetails = mentorDetailsData;
        console.log('Mentor details data', this.mentorDetails);
      });
  }
  










}
