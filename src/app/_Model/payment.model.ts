import { Order } from "./order.model";


export class Payment {
    
    id:number=0;
    datePayment:Date = new Date();
    cardNumber:number =0;
    cardType:string="";

    order :Order = new Order();

    constructor()
    {}
    
}
