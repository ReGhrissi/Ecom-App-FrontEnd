import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(data :any) 
  {
    this.set(data);
  }  
  
  set(data: any) 
  {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
  }



  getToken() 
  {
    return localStorage.getItem('token');
  }

  getId() {
    return localStorage.getItem('id');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  decode(payload : any) {
 //   console.log('payload : ', payload);
    return JSON.parse(atob(payload));
  }

  payload(token :any) {
    const payload = token.split('.')[1];
   // console.log('payload : ', payload);
    return this.decode(payload);
  }


  isValid() :boolean
  {
    const token = this.getToken();
    const id = this.getId();

    if (token) {

      const payload = this.payload(token);
      if (payload) 
      {
        const expirationDate = new Date(payload.exp * 1000); // Conversion en millisecondes
        const currentDate = new Date();

        if (currentDate > expirationDate)
        {
          this.remove()
        }
        return (id == payload.id && currentDate < expirationDate);
      }
    }
    return false;
  }


/*
  isTokenExpired(token: string): boolean 
  {
    if (!token) {
      return true; // Le token est absent
    }

    const tokenData = JSON.parse(atob(token.split('.')[1])); // Décodage du payload

    if (!tokenData.exp) {
      return true; // Date d'expiration manquante
    }

    const expirationDate = new Date(tokenData.exp * 1000); // Conversion en millisecondes
    const currentDate = new Date();

    return currentDate > expirationDate; // Vérification de l'expiration
  }
*/
  getInfos() {

    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
      
    }

    return null
  }


  loggedIn() :boolean
  {
    return this.isValid();
  }

  isAdmin() {
    const token = this.getToken();

    if (token) {

      const payload = this.payload(token);
      if (payload) {
        return payload.isAdmin == true;
      }
    }
    return false;
  }
}
