import { Component } from '@angular/core';
import { ProductsByRoleService } from '../../../../Service/productsByRole.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-products-by-user',
  templateUrl: './products-by-user.component.html',
  styleUrls: ['../../pages/homepage/homepage.component.css'],
  providers: [DatePipe],
})
export class ProductsByUserComponent {
  products: any;
  recentProduct: any;
  isLoading: boolean = false;

  constructor(
    private productsByRoleService: ProductsByRoleService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  formatDateTime(date: any): string {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm') ?? '';
  }

  navigateToProductDetails(id: string) {
    this.router.navigate(['base/my-product-details', id]);
  }

  ngOnInit(): void {
    this.productsByRoleService.getProductsByRole().subscribe((data) => {
      this.recentProduct = data;
      setTimeout(() => {
        $('#user-product').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25, 20, 25, 30, 35, 45, 60],
          dom: 'Blfrtip',
        });
      }, 1);
      console.log(this.recentProduct, 'Na d Result this');
    });
  }

  ngAfterViewInit(): void {}
  convertToNormalTime(time: string): string {
    const datePipe = new DatePipe('en-US');
    const parsedTime = new Date(time);
    if (!isNaN(parsedTime.getTime())) {
      return datePipe.transform(parsedTime, 'yyyy-MM-dd HH:mm:ss') || '';
    } else {
      return '';
    }
  }
}
