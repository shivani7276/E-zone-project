import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../../model/product.model';
import { EcommerceService } from '../../service/ecommerce.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Array<Product> = [];
  getCategoryList: any[] = [];
  category: any = 100;
  allProductList: Array<Product> = [];
  offset: number = 0;
  pageSize: number = 10; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(
    private eService: EcommerceService,
    private router: Router
  ) {
    this.eService.isAdminLoginPresent();
    this.getProductList(true);
  }

  ngOnInit(): void {
    this.getCategoryList = this.eService.getCategoryList();
  }

  getProductList(isAllProduct: boolean = false): void {
    let product: any = this.eService.getAllProducts(this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    if (!isAllProduct) {
      product = this.eService.getProductByCategory(this.category, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    }
    product.pipe(take(1)).subscribe((res: any) => {
      ;
      if (res && res?.product && Array.isArray(res?.product)) {
        this.productList = res?.product;
        this.allProductList = res?.product;
        this.totalItem = res?.totalProduct;
      }
    }, (err: any) => {
      console.log("Error");
    });
  }

  // delProduct(product: Product): void {
  //   this.eService.deleteProduct(product?.productId).pipe(take(1)).subscribe(
  //     (res: any) => {
  //       alert("Product deleted sucessfully");
  //       this.getProductList(this.category === 100 || this.category === "100");
  //     }, err => {
  //       console.log("Error");
  //     }
  //   )
  // }

  editProduct(product: Product): void {
    this.router.navigate(['/admin/addproduct'], {
      queryParams: {
        id: product?.productId
      }
    });

  }

  getProductByCategory(ev:any): void {
    this.offset = 0;
    this.totalItem = 1;
    this.category = ev?.value;
    if (this.category === "100") {
      this.getProductList(true);
    } else {
      this.getProductList(false);
    }
  }

  onNextPageClick(pageOffSet: any): void {
    this.offset = pageOffSet;
    this.getProductList(this.category === 100 || this.category === "100");
  }

  onPreviousPageClick(pageOffSet: any): void {
    this.offset -= 1;
    this.getProductList(this.category === 100 || this.category === "100");
  }

  onFirstPageClick(pageOffSet: any): void {
    this.offset = 0;
    this.getProductList(this.category === 100 || this.category === "100");
  }

  onLastPageClick(pageOffSet: any): void {
    const lastPage = Math.ceil(this.totalItem / this.pageSize);
    this.offset = lastPage;
    this.getProductList(this.category === 100 || this.category === "100");
  }

}

