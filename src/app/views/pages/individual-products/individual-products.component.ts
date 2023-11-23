import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProductService } from 'src/Service/userProduct.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-individual-products',
  templateUrl: './individual-products.component.html',
  styleUrls: ['../homepage/homepage.component.css']
})
export class IndividualProductsComponent implements OnInit {
  userId!: string;
  product: any;
  productImages: any;

  navigateToBusinessCategories(uid: string) {
    this.router.navigate(['product-details', uid]);
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uerProductService: UserProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = params.get('userId') ?? '';
          return this.uerProductService.getUserProduct(this.userId);
        })
      )
      .subscribe((product) => {
        this.product = product;
        console.log('Product', this.product);
      });
  }
}
