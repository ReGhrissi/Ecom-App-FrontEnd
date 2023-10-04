import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GatewayService {

  public gateway:string="http://localhost:8099/"

  constructor() { }

  
}
