import {Client} from './client.model';
import { Payment } from './payment.model';
import { ProductItem } from './product-item.model';


export class Order {
  public id:number;
  public client:Client={name:"",address:"",phoneNumber:"",email:"",username:""};
 // public client:Client = new Client()
  
  public products : Array<ProductItem>=[];
  public totalAmount:number;
  public date:Date =new Date();
  
  //public payment:Payment = new Payment();

      constructor()
      {
        this.id=0;
        this.totalAmount=0;
      }
    
}
