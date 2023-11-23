import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthenticationService } from 'src/Service/authentication.service';
import { UserService } from 'src/Service/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  userData: any;
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(
    private classToggler: ClassToggleService,
    private userService: UserService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {
    super();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
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
  }
}
