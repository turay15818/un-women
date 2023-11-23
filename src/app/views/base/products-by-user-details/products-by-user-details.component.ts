import { ProductByUsersDetailsService } from '../../../../Service/productByUsersDetails.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-by-user-details',
  templateUrl: './products-by-user-details.component.html',
  styleUrls: ['../../pages/homepage/homepage.component.css'],
})
export class ProductsByUserDetailsComponent implements OnInit {
  id!: string;
  productDetails: any;
  productImages: any;

  constructor(
    private route: ActivatedRoute,
    private productByUsersDetailsService: ProductByUsersDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = params.get('id') ?? '';
          return this.productByUsersDetailsService.getProductByUsersDetails(
            this.id
          );
        })
      )
      .subscribe((productDetailsData) => {
        this.productDetails = productDetailsData;
        console.log('Product details data', this.productDetails);
      });
  }
}
