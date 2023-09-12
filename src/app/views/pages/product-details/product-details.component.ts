import { ProductDetailsService } from '../../../../Service/product-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  uid!: string;
  productDetails: any;
  productImages: any;

  constructor(
    private route: ActivatedRoute,
    private productDetailsService: ProductDetailsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.uid = params.get('uid') ?? '';
          return this.productDetailsService.getProductByUid(this.uid);
        })
      )
      .subscribe((productDetailsData) => {
        this.productDetails = productDetailsData;
        console.log('Product details data', this.productDetails);
      });
  }
}
