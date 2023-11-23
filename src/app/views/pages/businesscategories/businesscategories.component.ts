import { BusinessCategoryService } from '../../../../Service/businessCategory.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

interface businessCategory {
  businessImageOne: string;

  businessLogo: string;
  uuid: number;
  userId: number;
  previousPrice: number;
  currentPrice: number;
  businessName: string;
  businessCategory: string;
}

@Component({
  selector: 'app-businesscategories',
  templateUrl: './businesscategories.component.html',
  styleUrls: ['../homepage/homepage.component.css'],
})
export class BusinesscategoriesComponent implements OnInit, OnDestroy {
  businessCategory!: string;
  businessCategories: businessCategory[] = [];
  businessImages: any;

  navigateTobusinessDetails(uuid: string) {
    this.router.navigate(['businessProfile-details', uuid]);
  }

  navigateToBusinessCategories(userId: string) {
    this.router.navigate(['usersProduct', userId]);
  }

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessCategoriesService: BusinessCategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.businessCategory = params.get('businessCategory') || '';
          return this.businessCategoriesService
            .getBusinessCategories(this.businessCategory)
            .pipe(
              catchError((error) => {
                console.error('Error:', error);
                return of([]);
              })
            );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((businessCategoriesData: businessCategory[]) => {
        this.businessCategories = businessCategoriesData;
        console.log('business Categories Data:', businessCategoriesData);
      });
  }

  getFirstbusinessImage(business: any): string {
    if (business.businessImages && business.businessImages.length > 0) {
      return business.businessImages[0].businessImageOne;
    }
    return 'path/to/placeholder-image.png';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
