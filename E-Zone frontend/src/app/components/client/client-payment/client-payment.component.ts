import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { EcommerceService } from '../../service/ecommerce.service';


@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.css']
})
export class ClientPaymentComponent implements OnInit {

  totalPrice:string='';
  orderId: number = 0;
  customer: any = {};
  nameOnCard:string='';
  cardNumber:string='';
  expYear:string='';
  cvv:string='';
  PaidDate:string='';
  paidAmount:string='';
  address:string='';
  discount:number=0;
  tot:number=0;
  constructor(
    private activateRoute: ActivatedRoute,
    private eService: EcommerceService,
    private datePipe:DatePipe,
    private router:Router
  ) {
    this.eService.isClientLoginPresent();
    this.activateRoute.params.subscribe((res: any) => {
      this.orderId = res?.orderId;
      this.totalPrice = res?.totalPrice;
      this.tot=parseInt(this.totalPrice);
      if(this.tot>5000){
        this.discount=(this.tot*10)/100;
        this.tot=this.tot-this.discount;
      }
    });
  }

  ngOnInit(): void {
    this.getCustomerDetail();
  }

  setPaidDate(ev: any): void {
    const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
    this.PaidDate = date;
  }

  getCustomerDetail(): void {
    const cid = this.eService.getClientAuthorization();
    this.eService.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
          
        }
      }, err => {
        console.log("Err");
      }
    )
  }
  onPayment():void{
    this.paidAmount=this.totalPrice;
    //validation
    if (this.nameOnCard.length=== 0 ) {
      alert("Name on card should not be blank");
      return;
    }
    if (this.cardNumber === '' || this.cardNumber.length < 16 || this.cardNumber.length > 16) {
   
      alert("card number exactly 16 digit");
      return;
    }
    if (this.expYear.length=== 0 ) {
      alert("Exp year  should not be blank");
      return;
    }
    if (parseInt(this.expYear)<(new Date().getFullYear()) ) {
      alert("Exp year  grater than current year");
      return;
    }
    if (this.cvv.length=== 0 ) {
      alert("CVV should not be blank");
      return;
    }
    this.setPaidDate(new Date());
    const body:any={
      totalPrice:parseInt(this.totalPrice),
      orderId:this.orderId,
      nameOnCard:this.nameOnCard,
      cardNumber:this.cardNumber,
      expYear:this.expYear,
      cvv:parseInt(this.cvv),
      PaidDate:this.PaidDate,
      paidAmount:parseInt(this.paidAmount),
      customer:this.customer


    };
    console.log("$$$$$$$",body);
    this.eService.addPayment(body,this.orderId,this.customer?.customerId).pipe(take(1)).subscribe(
      (res:any)=>{
        console.log("*********",res);
        if(res && res?.paymentId){
          alert("Payment done Successfully");
          this.router.navigate(["/client/order"])
        }
      },err=>{
        console.log("error");
      }
    )
  }

  openMap():void{
    const address= this.customer?.address+ ','+this.customer?.zipCode+ ','+this.customer?.state;
    console.log("@@@@@",address);
    window.open("https://www.google.com/maps/?q=" + "(" + address + ")", "_system");
  }
  

}
