import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {  

  bankList: Subject<any> = new Subject();
  bankList$: Observable<any> = this.bankList.asObservable()
  constructor() { }
  
  handleBankList(data:any) {
    this.bankList.next(data)
  }

}
