import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpService) { }

  getBanksByCity(city:String){
      return this.http.get('banks?city='+city)
  }
}
