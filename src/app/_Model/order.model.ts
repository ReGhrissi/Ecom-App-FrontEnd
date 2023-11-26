import {Client} from './client.model';
import { Payment } from './payment.model';
import { ProductItem } from './product-item.model';

 
export class Order {
  public orderId:string;
  public client:Client={name:"",address:"",phoneNumber:"",whatsapp:"",email:"",username:""};
 // public client:Client = new Client()
  
  public orderItems : Array<ProductItem>=[];
  public totalAmount:number;
  public orderDate:Date =new Date();
  
  //public payment:Payment = new Payment();

      constructor()
      {
        this.orderId='';
        this.totalAmount=0;
      }
    
}
