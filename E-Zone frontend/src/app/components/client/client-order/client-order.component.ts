import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Order } from '../../model/order.model';

import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryDialogComponent } from '../order-history-dialog/order-history-dialog.component';
import { EcommerceService } from '../../service/ecommerce.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {
  orderList: Order[]=[];
  constructor(
    private eService: EcommerceService,
    private router: Router,
    private datePipe : DatePipe,
    private dialog: MatDialog
  ) { 
    this.eService.isClientLoginPresent();
  }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList():void{
    this.eService.orderList(this.eService.getClientAuthorization()).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("************",res);
        if(!!res && Array.isArray(res)){
          this.orderList=res;
        }
        
      }, err => {
        console.log("Error");
      }
    )
  }
  getDate(d:string|undefined):any{
    //return  !!d ? this.datePipe.transform(new Date(d),"" )?.toString(): "";
    //return this.datePipe.transform(d,"").toString();
    let ans :any;
    console.log("DDDDDD",d);
    if(!!d && d!== null){
      ans=this.datePipe.transform(d,"shortDate")||null;
      console.log("@@@@@@@@",ans);
    }
    return ans;
  }
  
  addPayment(order: Order): void {
    this.router.navigate([`/client/payment/${order?.orderId}/${order?.totalPrice}`])
  }
  openHistory(order: Order): void {
    console.log('>>>>>>>', order);
    const dialogRef = this.dialog.open(OrderHistoryDialogComponent, {
      data: order,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
      
    });
  }

}
