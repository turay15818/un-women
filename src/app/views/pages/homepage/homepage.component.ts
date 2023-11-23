import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DistintCategoryService } from '../../../../Service/distint-category.service';
import { RecentProductService } from '../../../../Service/recent-product.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: any;
  recentProduct: any;
  isLoading: boolean = false;
  @ViewChild('heroCarousel', { static: false })
  heroCarousel: ElementRef | null = null;

  constructor(
    private distintCategoryService: DistintCategoryService,
    private recentProductService: RecentProductService,
    private router: Router
  ) {}

  navigateToProductDetails(uid: string) {
    this.router.navigate(['product-details', uid]);
  }

  navigateToProductCategories(category: string) {
    this.router.navigate(['product-categories', category]);
  }

  navigateToBusinessCategories(businessCategory: string) {
    this.router.navigate(['business-categories', businessCategory]);
  }

  ngOnInit(): void {
    if (this.heroCarousel) {
      const carouselElement = this.heroCarousel.nativeElement;
      if (typeof carouselElement.carousel === 'function') {
        carouselElement.carousel();
      }
    }
    //By Category
    this.distintCategoryService.getDistinctProducts().subscribe((data) => {
      this.products = data;
    });

    //Recent 15 Days
    this.recentProductService.getDistinctProducts().subscribe((data) => {
      this.recentProduct = data;
    });
  }
}
