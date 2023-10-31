import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
import { AuthentificationService } from '../services/authentification.service';
import { Product } from '../_Model/product.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { faBullhorn, faCartPlus, faCheckCircle, faSplotch, faUpload, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { PanierService } from '../services/panier.service';
import { Icons } from '../_Plugins/icons.model';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})



export class ProductDetailComponent implements OnInit {

  icons : Icons = new Icons();

  myEdit=this.icons.myEdit;
  myUpload=this.icons.myUpload;
  myCancel=this.icons.myCancel;
  myAddToCart = this.icons.myAddToCart;
  myAvailable= this.icons.myAvailable;
  myPromo=this.icons.myPromo;
  myNewPr = this.icons.myNewPr;


  currentProduct : any;
  selectedFiles : any ;
  progress: any;
  currentFileUpload: any;
  public timeStamp : any; //current Time
  public editPhoto: any;
  public mode: number=0;

    constructor(
                private router:Router,
                private route:ActivatedRoute,
                public catalService:CatalogueService,
                public authService:AuthentificationService,
                public panierService:PanierService  
            
              )
    {

    }

  ngOnInit(): void {
    
    let url=atob(this.route.snapshot.params['url']);
    console.log("aaaaaaaaaaa"+url);

    this.catalService.getProduct(url)
       .subscribe({
           next: data => {this.currentProduct=data;},
           error: err => console.error(err)
       });


  }

  onEditPhoto(p :any)
  {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event : any)
  {
    this.selectedFiles=event.target.files;

  }

  uploadPhoto()
  {
    this.progress= "0 %";

    this.currentFileUpload = this.selectedFiles.item(0)

    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
    .subscribe({

      next: event=>
                  {
                    if(event.type === HttpEventType.UploadProgress && event.total !== undefined)
                    {
                        this.progress = Math.round(100 * event.loaded / event.total)+" %";
                    }
                    else if(event instanceof HttpResponse)
                    {
                       // alert("Chargement avec succès !");
                        this.timeStamp=Date.now();
                        this.editPhoto=false; // ajouté ???
                    }

                  },
      
      error:  err=>
                  {
                    alert("Problème de chargement !");
                     
                  }
                  
              });
    
            this.selectedFiles =undefined;
    
  }

  onCancelUploadPhoto()
  {
    this.editPhoto=false;
  }

  onCancelUpdateProduct()
  {
    this.mode=0;
  }
/** 
  onAddProductToCaddy(p:Product) {
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
    }
    else{
      this.caddyService.addProduct(p);
    }
  }
*/
  getTS()
  {

    return this.timeStamp;
  }
/*
  public isAdmin()
  {
    return this.authService.isAdmin();
  }
*/

onProductDetails(p :any) {
  this.router.navigateByUrl("/product/"+p.id);
}

onEditProduct()
{
  this.mode=1;
}

// methode qui permet la modif d un produit
onUpdateProduct(data :any) 
{
  let url=this.currentProduct._links.self.href;

  console.log("patch product :"+url)
  this.catalService.patchResource(url,data)
    .subscribe(d=>{
      this.currentProduct=d;
      this.mode=0;
    },err=>{
      console.log(err);
    })
}


  // Methode qui permet d'ajouter un produit au panier
  onAddProductToCaddy(p:Product)
  {
    /**
        if(!this.authService.isAuthenticated)
        {
          this.router.navigateByUrl("/login");
        }
    */
        this.panierService.addProduct(p);
  
  }


}
