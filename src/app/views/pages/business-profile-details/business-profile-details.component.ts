import { Component, OnInit } from '@angular/core';
import { BusinessProfileDetailsService } from 'src/Service/businessProfileDetails.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';





import { Router } from '@angular/router';
@Component({
  selector: 'app-business-profile-details',
  templateUrl: './business-profile-details.component.html',
  styleUrls: ['../homepage/homepage.component.css'],
})
export class BusinessProfileDetailsComponent implements OnInit {
  uuid!: string;
  businessProfileDetails: any;
  productImages: any;

  navigateToBusinessCategories(uid: string) {
    this.router.navigate(['product-details', uid]);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessProfileDetailsService: BusinessProfileDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.uuid = params.get('uuid') ?? '';
          return this.businessProfileDetailsService.getBusinessProfileDetails(
            this.uuid
          );
        })
      )
      .subscribe((businessProfileDetails) => {
        this.businessProfileDetails = businessProfileDetails;
        console.log('Product', this.businessProfileDetails);
      });
  }
}
