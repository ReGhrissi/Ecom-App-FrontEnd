import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
import { AuthentificationService } from '../services/authentification.service';
import { Product } from '../_Model/product.model';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { faBullhorn, faCartPlus, faCheckCircle, faSplotch,  faUpload, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { PanierService } from '../services/panier.service';
import { Icons } from '../_Plugins/icons.model';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommentService } from '../services/comment.service';


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
  myGoTo = this.icons.myGoTo;
  myCatManage = this.icons.myCatManage; 
  myAccount=this.icons.myAccount;
  myValid=this.icons.myValid;
  myComment= faCommentDots
  myCommentSolid=this.icons.myCommentSolid
  myUser=this.icons.myUser
  myDelete=faTrashCan



  currentProduct : any;
  currentCategory:any;
  productsOfCategory :any


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
                public panierService:PanierService,
                private httpClient:HttpClient,
                public userService:UserService,
                public commentService:CommentService  
            
              )
    {

    }

    currentComment:any;
    commentForm:any

  ngOnInit(): void {
    
    let url=atob(this.route.snapshot.params['url']);
    console.log("aaaaaaaaaaa"+url);

    this.catalService.getProduct(url)
       .subscribe({
           next: data => {this.currentProduct=data;},
           error: err => console.error(err)
       });

    
       this.httpClient.get(url+"/category").subscribe((category: any) => {

        this.currentCategory = category;

        let idCat = this.currentCategory.id;
  
        this.catalService.getRessource('/categories/'+idCat+'/products').subscribe((products: any) => {
                
          this.productsOfCategory = products._embedded.products;
        });


      });

      this.commentForm = new FormGroup({

        commentText: new FormControl('',[Validators.required]),
  
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

  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout :2000,
    autoplayHoverPause : true,
    animateOut:'fadeOut',
    navSpeed: 600,
    navText: ['<', '>'],
    margin:15,
    /* 
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    */
    nav: true
  }

  onAddComment()
  {
    const commentText = this.commentForm.get('commentText')?.value || '';
    const commentDate : Date = new Date()

    let url = "/comments"

    this.commentService.onPostComment(url,{commentText, commentDate})
      .subscribe({

          next: (data:any) => {
              console.log("comment :"+data)
                            this.currentComment=data;
                            window.location.reload();
                            
                        },

          error: err => console.error(err)
      });
  }
}
