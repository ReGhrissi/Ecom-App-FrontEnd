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
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Location} from '@angular/common';
import { AccountService } from '../services/account.service';


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
  myAdmin=this.icons.myAdmin
  myBack=this.icons.myBack
  



  currentProduct : any;
  currentCategory:any;
  productsOfCategory :any
  commentsOfProduct:any
  usersOfComments:any;
  currentUser :any;

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
                public commentService:CommentService,
                private location:Location,
                private accountService : AccountService
            
              )
    {

    }

    currentComment:any;
    commentForm:any
    addProductToCaddyForm:any;

  ngOnInit(): void {

    this.currentUser = this.authService.userAuthenticated;
    
    let productId = this.route.snapshot.params['productId'];
    console.log("aaaaaaaaaaa :"+productId);

        this.catalService.getRessource("/products/"+productId)
          .subscribe({
              next: product => {
                  this.currentProduct=product;

                  this.catalService.getRessource("/categories/"+this.currentProduct.categoryId).subscribe((category: any) => {

                      this.currentCategory = category;
                              
                      this.productsOfCategory = this.currentCategory.products;   
                  });

                  this.commentsOfProduct =this.currentProduct.comments;

                  const userRequests = this.commentsOfProduct.map((comment :any) => this.userService.getUser(comment.userId));

                  forkJoin(userRequests).subscribe((users :any) => {
                      // Associer chaque commentaire à son utilisateur correspondant
                      this.commentsOfProduct.forEach((comment :any, index :any) => {
                        comment.user = users[index];
                      });
                  });  
              },
              error: err => console.error(err)
        });

      this.commentForm = new FormGroup({

        commentText: new FormControl('',[Validators.required]),
  
        });
   

  }

  onBack()
  {
      this.location.back();
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

    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.productId)
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
/*
  onCancelUpdateProduct()
  {
    this.mode=0;
  }
*/
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

onEditProduct(idProduct:any)
{
  this.router.navigateByUrl("/product-edit/"+idProduct);
} 

/*
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
*/
incrementQuantity() 
{
  if (this.currentProduct.quantity < 10) 
  { // Empêche d'aller au-delà de 10
    this.currentProduct.quantity++;
  }
}

decrementQuantity() 
{
  if (this.currentProduct.quantity > 1) 
  { // Empêche d'aller en dessous de 1
    this.currentProduct.quantity--;
  }
}

  // Methode qui permet d'ajouter un produit au panier
  onAddProductToCaddy(p:Product)
  {
        if(this.currentUser)
        {
          this.panierService.addUserProduct(p);
          this.currentProduct.quantity =1;
        }
        else 
        {
          this.panierService.addGuestProduct(p);
          this.currentProduct.quantity =1;
        }

  
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

    let url = "/comments/"+this.currentProduct.productId

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
