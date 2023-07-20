import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../../model/product.model';
import { EcommerceService } from '../../service/ecommerce.service';

@Component({
  selector: 'app-admin-addproduct',
  templateUrl: './admin-addproduct.component.html',
  styleUrls: ['./admin-addproduct.component.css']
})
export class AdminAddproductComponent implements OnInit {

  productname: string = '';
  image: string = '';
  description: string = '';
  mrpPrice: number = 0;
  quantity: number = 0;
  isEdit: boolean = false;
  productId: any;
  getCategoryList: any[] = [];
  category: number = 0;
  

  constructor(

    private eService: EcommerceService,
    private router: Router,
    private activateRouter: ActivatedRoute


  ) {
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.isEdit = true;
        this.eService.getProductById(params?.id).pipe(take(1)).subscribe((res:any)=> {
          if(!!res && res?.productId){
          
            const product :Product=res;
            console.log('>>>>', product);
            this.productname= product?.productname;
            this.description=product?.description;
            this.image=product?.image;
            this.mrpPrice=product?.mrpPrice;
            this.quantity=product?.quantity;
            this.productId=product?.productId;
            const categoryName = this.getCategoryList.find((cate: any) => cate?.name.toString() === product?.category)?.value;
            this.category = categoryName;
            
          }
          console.log(res);
        });
      }

    })
  }
  ngOnInit(): void {
    this.eService.isAdminLoginPresent();
    this.getCategoryList = this.eService.getCategoryList();
  }

  onAddProduct(): void {
   
    if (this.productname === '') {
      alert("Product name is required");
      return;
    }
    if (this.description === '') {
      alert("description  is required");
      return;
    }

    if (this.image === '') {
      alert("Image should not be blank");
      return;
    }
    console.log("******MRP price",this.mrpPrice);
    if (this.mrpPrice === 0 || this.mrpPrice===null) {
      alert("MRP Price should not be zero/blank");
      return;
    }
    if (this.quantity === 0|| this.quantity===null) {
      alert("Quantity should not be zero/blank");
      return;
    }
    
 

    const body: any = {
      productname: this.productname,
      image: this.image,
      description: this.description,
      mrpPrice: this.mrpPrice,
      quantity: this.quantity,
      category: this.category,
      
    }
    if(this.isEdit){
      console.log("=======>", body);
    this.eService.editProduct(body,this.productId).pipe(take(1)).subscribe((res: any) => {
      console.log("*****", res);
      if (res && res?.productId) {
        alert("Product updated sucessfully");
        this.router.navigate(["/admin/listproduct"]);
      }
    }, err => {
      console.log("Error  ", err);
      alert("Something going wrong!!pl try again");
    })
    }else{
      console.log("=======>", body);
      this.eService.addProduct(body).pipe(take(1)).subscribe((res: any) => {
        console.log("*****", res);
        if (res && res?.productId) {
          alert("Product added sucessfully");
          this.router.navigate(["/admin/listproduct"]);
        }
      }, err => {
        console.log("Error  ", err);
        alert("Something going wrong!!pl try again");
      })
    }

    

  }
}









