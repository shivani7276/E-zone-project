import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Order } from '../../model/order.model';
import { take } from 'rxjs';
import { EcommerceService } from '../../service/ecommerce.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent {
  orderList: Order[] = [];
  tempOrderList: Order[] = [];
  today = new Date();

  constructor(
    private eService:EcommerceService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.eService.isAdminLoginPresent();
  }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList(): void {
    this.eService.getAllorderList().pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && Array.isArray(res)) {
          this.orderList = res;
          this.tempOrderList = res;
        }
      }, err => {
        console.log("Error");
      }
    )
  }
  getDate(d: string | undefined): any {
    let ans: any;
    if (!!d && d !== null) {
      ans = this.datePipe.transform(d, "shortDate") || null;
    }
    return ans;
  }

  changeDate(ev: any): void {
    const date: string = this.datePipe.transform(ev?.value, 'yyyy-MM-dd')?.toString() || '';
   //  console.log(new Date(this.orderList[0].orderedDate).getTime(), '>>>>>>', new Date(date).getTime() );
    this.orderList= this.tempOrderList.filter((item: Order) => new Date(item?.orderedDate).getTime() === new Date(date).getTime() );
    // this.appointmentDate = date;
  }

}
