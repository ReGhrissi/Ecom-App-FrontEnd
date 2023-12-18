import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { User } from '../_Model/user.model';
import Swal from 'sweetalert2';

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
  myDelete=this.icons.myDelete
  myGoTo=this.icons.myGoTo

  currentUser:any;
  currentContact:any;
  currentPaymentCard:any;
  idUser:any;

  editionProfil : boolean =false;
  editionContact :boolean=false;
  editionPaymentCard:boolean=false;
  changePassword : boolean =false;

  editProfilForm :any;
  //editAddresForm:any;
 // editContactForm :any

  selectedFiles : any ;
  progress: any;
  currentFileUpload: any;
  public timeStamp : any; //current Time
  public editPhoto: any;

  changePasswordForm = new FormGroup ({

    currentPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required]) 
    
    });

  //  cu :User = new User();


  constructor(public userService:UserService, private activateRoute :ActivatedRoute,
             private formBuilder:FormBuilder, public catalService :CatalogueService)
  {
    
  }

  ngOnInit(): void 
  {
    this.activateRoute.params.subscribe((data)=>
     {              
            this.idUser = data['idUser']

            this.userService.getUser(this.idUser).subscribe({

              next: (data:any) => {
                                this.currentUser=data;
                              //  this.cu=this.currentUser;
                               // console.log("current USER :"+data.addresses[0].type)
                              
                                this.editProfilForm = new FormGroup({

                                  firstName: new FormControl(null,[Validators.required]),
                                  lastName: new FormControl(null,[Validators.required]),
                                  country: new FormControl(null,[Validators.required]),
                                  city: new FormControl(null,[Validators.required]),
                                  street: new FormControl(null,[Validators.required]),
                                  postal: new FormControl(null,[Validators.required]),
                                  mobile: new FormControl(null,[Validators.required]),
                                  skype: new FormControl(null,[Validators.required]),
                                  cardNumber: new FormControl(null,[Validators.required]),
                                  cardOwner: new FormControl(null,[Validators.required]),

                                  });

                                  if (this.currentUser) 
                                  {
                                    this.editProfilForm.patchValue({
                                      firstName: this.currentUser.firstName,
                                      lastName: this.currentUser.lastName,
                                    });
                                  }

                                  if (this.currentUser.contact) 
                                  {
                                    this.editProfilForm.patchValue({
                                      country : this.currentUser.contact.country,
                                      city : this.currentUser.contact.city,
                                      street : this.currentUser.contact.street,
                                      postal : this.currentUser.contact.postal,
                                      mobile : this.currentUser.contact.mobile,
                                      skype :this.currentUser.contact.skype
                                    });
                                  }

                                  if (this.currentUser.paymentCard) 
                                  {
                                    this.editProfilForm.patchValue({
                                      cardNumber: this.currentUser.paymentCard.cardNumber,
                                      cardOwner :this.currentUser.paymentCard.cardOwner
                                    });
                                  }
                              
                           
                            },

              error: err => {
                console.error(err)

                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Erreur : "+err.status,
                  text:"",
                  showConfirmButton: false,
                  timer: 3000
                });
              }
          });
 
      })



  }


  postContactForm = new FormGroup({

      country: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      street: new FormControl('',[Validators.required]),
      postal: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required]),
      skype: new FormControl('',[Validators.required]),
  
  });

  postPaymentCardForm = new FormGroup({

      cardNumber: new FormControl('',[Validators.required]),
      cardOwner: new FormControl('',[Validators.required]),
    
  });


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

  onChangeStatus_Contact(value : boolean)
  {
    this.editionContact = value;
  }

  onChangeStatus_PaymentCard(value : boolean)
  {
    this.editionPaymentCard = value;
  }

  onChangeStatus_Password(value : boolean)
  {
    this.changePassword = value;
  }

  onPostContact()
  {
    const country = this.postContactForm.get('country')?.value || '';
    const city = this.postContactForm.get('city')?.value || '';
    const street = this.postContactForm.get('street')?.value || '';
    const postal = this.postContactForm.get('postal')?.value || '';
    const mobile = this.postContactForm.get('mobile')?.value || '';
    const skype = this.postContactForm.get('skype')?.value || '';
    
    let url = "/contacts"

    this.userService.postContact(url,{country,city,street,postal,mobile,skype})
      .subscribe({

          next: (data:any) => {
                            this.currentContact=data;
                            this.currentUser.contact =this.currentContact;
                            this.editionContact = false;

                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Enregistrement réussit !",
                              text:"Vos cordonnées personnelles ont été ajoutées avec succès !",
                              showConfirmButton: false,
                              timer: 3000
                            });
                            
                            setTimeout(() => 
                            {
                              window.location.reload();
                              
                            }, 2500);
                        },

          error: err => 
          {
            console.error(err)

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Erreur : "+err.status,
              text:"",
              showConfirmButton: false,
              timer: 3000
            });
          }
      });

  }

  onPostPaymentCard()
  {
    const cardNumber = this.postPaymentCardForm.get('cardNumber')?.value || '';
    const cardOwner = this.postPaymentCardForm.get('cardOwner')?.value || '';
    
    let url = "/paymentCards"

    this.userService.postPaymentCard(url,{cardNumber,cardOwner})
      .subscribe({

          next: (data:any) => {
                            this.currentPaymentCard=data;
                            this.currentUser.paymentCard=this.currentPaymentCard;
                            this.editionPaymentCard = false;


                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Enregistrement réussit !",
                              text:"Votre carte de payement a été ajoutée avec succès !",
                              showConfirmButton: false,
                              timer: 3000
                            });
                            
                            setTimeout(() => 
                            {
                              window.location.reload();
                              
                            }, 2500);
                        },

          error: err =>{ 
            console.error(err)

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Erreur : "+err.status,
              text:"",
              showConfirmButton: false,
              timer: 2000
            });
          }
      });

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

    this.userService.updateProfil(url,{   firstName, lastName, 
                                          contact:{country,city,street,postal,mobile,skype},
                                          paymentCard:{cardNumber,cardOwner}
                                      }).subscribe({

          next: (data:any) => {
                            this.currentUser=data;
                            this.editionProfil = false;

                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "",
                              showConfirmButton: false,
                              timer: 2000
                            });
                            
                            setTimeout(() => 
                            {
                              window.location.reload();
                              
                            }, 1500);
                        },

          error: err =>{ 
            console.error(err)

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Erreur : "+err.status,
              text:"",
              showConfirmButton: false,
              timer: 2000
            });
          }
      });

  }
/*
  onEditContact()
  {
    const country = this.editProfilForm.get('country')?.value || '';
    const city = this.editProfilForm.get('city')?.value || '';
    const street = this.editProfilForm.get('street')?.value || '';
    const postal = this.editProfilForm.get('postal')?.value || '';
    const mobile = this.editProfilForm.get('mobile')?.value || '';
    const skype = this.editProfilForm.get('skype')?.value || '';

    
    let url = "/contacts/"+this.currentContact.contactId

    this.userService.updateContact(url,{country,city,street,postal,mobile,skype})
      .subscribe({

          next: (data:any) => {
                            this.currentContact=data;
                            window.location.reload();
                            this.editionProfil = false;
                        },

          error: err => console.error(err)
      });

  }
*/
/*
  onEditPaymentCard()
  {

    const cardNumber = this.editProfilForm.get('cardNumber')?.value || '';
    const cardOwner = this.editProfilForm.get('cardOwner')?.value || '';
    
    let url = "/paymentCatrds/"+this.currentPaymentCard.paymentCardId 

    this.userService.updatePaymentCard(url,{cardNumber,cardOwner})
      .subscribe({

          next: (data:any) => {
                            this.currentPaymentCard=data;
                            window.location.reload();
                            this.editionProfil = false;
                        },

          error: err => console.error(err)
      });

  }
*/
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

  uploadPhoto(event : any)
  {
    this.selectedFiles=event.target.files;

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
                        this.timeStamp=Date.now();
                        this.editPhoto=false; // ajouté ???

                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "",
                          showConfirmButton: false,
                          timer: 2000
                        });
                        
                        setTimeout(() => 
                        {
                          window.location.reload();
                          
                        }, 1500);
                       
                    }

                  },
      
      error:  err=>
                  {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Erreur : "+err.status,
                      text:"",
                      showConfirmButton: false,
                      timer: 2000
                    });
                     
                  }
                  
              });
    
            this.selectedFiles =undefined;
    
  }

  onCancelUploadPhoto()
  {
    this.editPhoto=false;
  }

}