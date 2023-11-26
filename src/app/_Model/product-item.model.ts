

export class ProductItem {
    public id :number
    public productId:string;
    public name:string;
    public price:number;
    public quantity:number;


    constructor()
    {
        this.id=0
        this.productId='';
        this.name='';
        this.price=0;
        this.quantity=0;

    }
}

/*
import { Product } from "./product.model";
export class ProductItem
{
    public product:Product;
    public quantity:number;
    public price:number;
    

    constructor(
                    product:Product,
                    quantity:number,
                    price:number
            ) 
        {
            this.product=product;
            this.quantity=quantity;
            this.price=price;

        }
    }
 */   
    
