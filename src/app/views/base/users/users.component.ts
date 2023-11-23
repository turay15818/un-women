import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/Service/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  usersData: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsersData();
  }

  loadUsersData(): void {
    this.usersService.getUsers().subscribe(
      (data: any[]) => {
        this.usersData = data; 
      },
      (error) => {
        console.error('Error loading users data: ', error);
      }
    );
  }
}
