import { Component } from '@angular/core';
import { mentorNavItems } from './_nav';
import { navItems } from './_nav';
import { OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/Service/user.service';
import { FormBuilder } from '@angular/forms';
import { MentorProfileService } from '../../../Service/mentorProfile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  userData: any;
  Data: any;
  
  public navItems = navItems;
  public mentorNavItems = mentorNavItems;

  constructor(
    private userService: UserService,
    private mentorProfileServices: MentorProfileService
  ) {}

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
  }
}
