import { Component, OnInit } from '@angular/core';
import { MentorProfileService } from 'src/Service/mentorProfile.service';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userData: any;
  Data: any;

  constructor(private userService: UserService) {}

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
