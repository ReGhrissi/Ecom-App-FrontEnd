import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {

  loginForm = new FormGroup({

    email: new FormControl('',[Validators.required,Validators.email]),
   
    
});

get Email()
{
return this.loginForm.get('email');
}
onResetPassword()
{
  
}
}
