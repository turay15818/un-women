import { Component } from '@angular/core';
import { NewsLetterService } from '../../../../Service/newsLetter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  email: string = '';
  subscriptionSuccessful: boolean = false;

  constructor(private newsletterService: NewsLetterService) {}

  subscribeToNewsletter() {
    this.newsletterService.createNewsletter(this.email).subscribe(
      (response) => {
        console.log('Newsletter subscription successful:', response);
        this.subscriptionSuccessful = true;
        this.email = '';
      },
      (error) => {
        console.error('Error subscribing to newsletter:', error);
      }
    );
  }
}
