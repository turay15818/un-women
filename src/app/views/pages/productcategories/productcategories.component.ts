import { ProductCategoriesService } from '../../../../Service/productCategories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

interface ProductCategory {
  productImageOne: string;
  
  ProductImages: string;
  uuid: number;
  previousPrice: number;
  currentPrice: number;
  productName: string;
}


@Component({
  selector: 'app-productcategories',
  templateUrl: './productcategories.component.html',
  styleUrls:[ '../homepage/homepage.component.css']
})
export class ProductcategoriesComponent implements OnInit, OnDestroy {
  category!: string;
  productCategories: ProductCategory[] = [];
  productImages: any;

  navigateToProductDetails(uuid: string) {
    this.router.navigate(['product-details', uuid]);
  }

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productCategoriesService: ProductCategoriesService
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.category = params.get('category') || '';
          return this.productCategoriesService.getProductCategories(this.category).pipe(
            catchError((error) => {
              console.error('Error:', error);
              return of([]);
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((productCategoriesData: ProductCategory[]) => {
        this.productCategories = productCategoriesData;
        console.log('Product Categories Data:', productCategoriesData);
      });
  }
  getFirstProductImage(product: any): string {
    if (product.ProductImages && product.ProductImages.length > 0) {
      return product.ProductImages[0].productImageOne;
    }
    return 'path/to/placeholder-image.png';
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
