import { Product } from "./product.model";

export interface Order{
    orderId : number;
    mrpPrice : number;
    quantity : number;
    totalPrice: number;	
    orderStatus:string;
    paymentStatus:string;
    orderedDate:string;
    productname: string;
    image: string;
    customer:any;
    product: Array<Product>
}