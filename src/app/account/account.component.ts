import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  icons : Icons = new Icons();

  myAccount =this.icons.myAccount
  myCancel = this.icons.myCancel
  myValid= this.icons.myValid
  myEdit = this.icons.myEdit_2
  myEmail=this.icons.myEmail
  myPhone=this.icons.myPhone
  myAddress=this.icons.myaddress
  myWhatsapp=this.icons.myWhatsapp
  mySkype=this.icons.mySkype
  myUserName =this.icons.myUserName
  myAdmin =this.icons.myAdmin
  myId = this.icons.myId
  myCard=this.icons.myCreditCard
  myDate=this.icons.myDate
  myKey=this.icons.myKey
  myPassword=this.icons.myPassword
  myCountry=this.icons.myCountry
  myCity=this.icons.myCity
  myStreet=this.icons.myStreet
  myPostal=this.icons.myPostal
  myUpload=this.icons.myUpload

  currentUser:any;
  idUser:any;

  editionProfil : boolean =false;
  changePassword : boolean =false;

  editProfilForm :any;
  editAddresForm:any;
  editContactForm :any

  selectedFiles : any ;
  progress: any;
  currentFileUpload: any;
  public timeStamp : any; //current Time
  public editPhoto: any;

  changePasswordForm = new FormGroup ({

    currentPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required]) 
    
    });




  constructor(public userService:UserService, private activateRoute :ActivatedRoute,
             private formBuilder:FormBuilder, public catalService :CatalogueService)
  {}

  ngOnInit(): void
  {
    this.activateRoute.params.subscribe((data)=>
     {              
            this.idUser = data['idUser']

            this.userService.getUser(this.idUser).subscribe({

              next: (data:any) => {
                                this.currentUser=data;
                               // console.log("current USER :"+data.addresses[0].type)
                              /*
                                this.editProfilForm = new FormGroup({

                                  firstName: new FormControl(this.currentUser.firstName,[Validators.required]),
                                  lastName: new FormControl(this.currentUser.lastName,[Validators.required]),
                                  country: new FormControl(this.currentUser.contact.country,[Validators.required]),
                                  city: new FormControl(this.currentUser.contact.city,[Validators.required]),
                                  street: new FormControl(this.currentUser.contact.street,[Validators.required]),
                                  postal: new FormControl(this.currentUser.contact.postal,[Validators.required]),
                                  mobile: new FormControl(this.currentUser.contact.mobile,[Validators.required]),
                                  skype: new FormControl(this.currentUser.contact.skype,[Validators.required]),
                                  cardNumber: new FormControl(this.currentUser.paymentCard.cardNumber,[Validators.required]),
                                  cardOwner: new FormControl(this.currentUser.paymentCard.cardOwner,[Validators.required]),

                                  });
                              */
                                  const personalInfoGroup = this.formBuilder.group({
                                    firstName: [this.currentUser.firstName, [Validators.required]],
                                    lastName: [this.currentUser.lastName, [Validators.required]],

                                  });
                                                                    
                                  // Créez un groupe de contrôles pour les informations de la carte de paiement
                                  const contactInfoGroup = this.formBuilder.group({
                                    country: [this.currentUser.contact.country, [Validators.required]],
                                    city: [this.currentUser.contact.city, [Validators.required]],
                                    street: [this.currentUser.contact.street, [Validators.required]],
                                    postal: [this.currentUser.contact.postal, [Validators.required]],
                                    mobile: [this.currentUser.contact.mobile, [Validators.required]],
                                    skype: [this.currentUser.contact.skype, [Validators.required]],
                                  });
                                  // Créez un groupe de contrôles pour les informations de la carte de paiement
                                  const paymentCardGroup = this.formBuilder.group({
                                    cardNumber: [this.currentUser.paymentCard.cardNumber, [Validators.required]],
                                    cardOwner: [this.currentUser.paymentCard.cardOwner, [Validators.required]],
                                  });
                                  
                                  // Combine les groupes de contrôles si nécessaire
                                  const editProfilForm = this.formBuilder.group({
                                    personalInfo: personalInfoGroup,
                                    contactInfo:contactInfoGroup,
                                    paymentCardInfo: paymentCardGroup,
                                  });
                                  
                                  // Utilisez editProfilForm comme votre formulaire principal
                                  this.editProfilForm = editProfilForm;
                            },

              error: err => console.error(err)
          });
 
      })



  }

  get FirstName()
  {
  return this.editProfilForm?.get('firstName');
  }
  get LastName()
  {
  return this.editProfilForm?.get('lastName');
  }

  onChangeStatus_Profil(value : boolean)
  {
    this.editionProfil = value;
  }

  onChangeStatus_Password(value : boolean)
  {
    this.changePassword = value;
  }


  onEditProfil()
  {
    const firstName = this.editProfilForm.get('firstName')?.value || '' ;
    const lastName = this.editProfilForm.get('lastName')?.value || '';
    const country = this.editProfilForm.get('country')?.value || '';
    const city = this.editProfilForm.get('city')?.value || '';
    const street = this.editProfilForm.get('street')?.value || '';
    const postal = this.editProfilForm.get('postal')?.value || '';
    const mobile = this.editProfilForm.get('mobile')?.value || '';
    const skype = this.editProfilForm.get('skype')?.value || '';
    const cardNumber = this.editProfilForm.get('cardNumber')?.value || '';
    const cardOwner = this.editProfilForm.get('cardOwner')?.value || '';
    
    let url = "/users/"+this.currentUser.userId

    this.userService.updateUser(url,{firstName, lastName, contact:{country,city,street,postal,mobile,skype},
                                                          paymentCard:{cardNumber,cardOwner}})
      .subscribe({

          next: (data:any) => {
                            this.currentUser=data;
                            window.location.reload();
                            this.editionProfil = false;
                        },

          error: err => console.error(err)
      });

  }

  onChangePassword()
  {

  }

  
  getTS()
  {

    return this.timeStamp;
  }


  onEditPhoto()
  {
  //  this.currentProduct=p;
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

    this.userService.uploadPhotoProduct(this.currentFileUpload, this.currentUser.userId)
    .subscribe({

      next: event=>
                  {
                    if(event.type === HttpEventType.UploadProgress && event.total !== undefined)
                    {
                        this.progress = Math.round(100 * event.loaded / event.total)+" %";
                    }
                    else if(event instanceof HttpResponse)
                    {
                      //  alert("Chargement avec succès !");
                        this.timeStamp=Date.now();
                        this.editPhoto=false; // ajouté ???
                        window.location.reload();
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

}