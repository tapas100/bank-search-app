import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, transition, style, animate } from '@angular/animations';

export interface BankData {
  address: String,
  bank_id: Number,
  bank_name: String,
  branch: String,
  city: String,
  district: String
  ifsc: String
  state: String
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: BankData | null;
  bankList = []
  pageLength: number = 0;
  pageSize: number = 5;
  bankViewList = [];
  columnKeys = [];
  favoriteBanks:any[] = [];
  constructor(private dataService: DataService) {
    // const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    this.columnKeys = [...this.displayedColumns];    
    this.columnKeys.pop();
    console.log(this.columnKeys,this.displayedColumns)
  }
  displayedColumns: any[] = [
    'bank_name',
     'branch' ,
     'ifsc',
    //  'city',
     'favorite'
  ];
  dataSource: MatTableDataSource<any>;


  ngOnInit() {
    this.favoriteBanks = JSON.parse(localStorage.getItem('favBanks')) != null ? JSON.parse(localStorage.getItem('favBanks')): [];
    this.getBankList();
  }

  getBankList() {
    this.dataService.bankList$.subscribe(
      response => {
        console.log('response', response)
        this.bankList = response;
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  searchBanks(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addToFavorites(event,element){
    console.log(event,element);
    this.favoriteBanks.push(element.ifsc);
    this.favoriteBanks = this.favoriteBanks.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
  })
    localStorage.setItem('favBanks',JSON.stringify(this.favoriteBanks));
  }

  isfav(element){
    console.log(this.favoriteBanks,element);
    return this.favoriteBanks.find(ele => ele == element.ifsc);
  }
}

