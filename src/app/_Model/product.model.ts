
export interface Product{
    id:number
    productId:string;
    name:string;
    description:string;

    price:number;
    currentPrice:number;

    stock : number;

    tendancyProduct:boolean;
    newProduct:boolean;
    futurProduct:boolean;

    promotionProduct:boolean;
    promotionRate:number;

    selectedProduct:boolean;
    availableProduct:boolean;

    quantity:number;
    
  
  } 