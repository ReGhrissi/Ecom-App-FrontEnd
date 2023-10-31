import { Product } from "./product.model";

export interface Category
{
    id:number;
    name:string;
    description:string;
    _links:{
        self:{
          href:string;
        },
        category:{
          href:string;
        },
        products:{
          href:string
        }
      }

    

}