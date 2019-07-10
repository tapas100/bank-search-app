import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { BankService } from '../../services/bank.service';

export interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  citis: City[] = [
    {value: 'BANGLORE', viewValue: 'Banglore'},
    {value: 'DELHI', viewValue: 'Delhi'},
    {value: 'MUMBAI', viewValue: 'Mumbai'},
    {value: 'HYDERABAD', viewValue: 'Hyderabad'},
    {value: 'NOIDA', viewValue: 'Noida'}
  ];
  selected = 'BANGLORE';
  @Output() searchClicked  = new EventEmitter<any>()
  searchInput:any;
  constructor(private dataService:DataService,private bankService:BankService) { 
    this.searchClicked = new EventEmitter()
  }

  ngOnInit() {
    this.changeCity();
  }

  searchEvent(){
    // console.log(this.searchInput)
     this.searchClicked.emit(this.searchInput)
  }

  changeCity(){
     this.updateBankList(this.selected,this.searchInput);
  }
  
  updateBankList(city,searchInput){
    this.bankService.getBanksByCity(city).subscribe(res=>{
      this.dataService.handleBankList(res);
    })
  }

}
