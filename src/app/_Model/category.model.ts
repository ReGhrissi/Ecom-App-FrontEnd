import { Product } from "./product.model";

export interface Category
{
    categoryId:number;
    photoName:string;
    name:string;
    description:string;
    active :boolean;

    products:Product[];

}