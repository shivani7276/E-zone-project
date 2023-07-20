import { Product } from "./product.model";

export interface Cart{
    cartId : number;
    quantity : number;
    mrpPrice : number;
    product: Product;
    customer : any;
}