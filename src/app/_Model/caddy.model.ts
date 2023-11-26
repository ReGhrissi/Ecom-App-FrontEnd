import { Client } from "./client.model";
import { ProductItem } from "./product-item.model";


export class Caddy
{
    public items : Map<number,ProductItem> =new Map();
    public client:Client={name:"",address:"",phoneNumber:"",whatsapp:"",email:"",username:""};

}