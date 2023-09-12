import { Component, OnInit } from '@angular/core';
import { AllProductService } from '../../../../Service/all-product.service';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessComponent implements OnInit {
  products: any;
  constructor(private allProductService: AllProductService) {}

  ngOnInit() {
    this.allProductService.getDistinctProducts().subscribe((data) => {
      this.products = data;
      console.log('this is the product Data', data);
    });
  }
}
