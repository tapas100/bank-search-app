import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { BankData } from '../models/bankData';

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
  pageSize: number = 20;
  columnKeys = [];
  favoriteBanks: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: any[] = [
    'bank_name',
    'ifsc',
    'favorite'

  ];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.favoriteBanks = JSON.parse(localStorage.getItem('favBanks')) != null ? JSON.parse(localStorage.getItem('favBanks')) : [];
    this.getBankList();
  }

  getBankList() {
    this.dataService.bankList$.subscribe(
      response => {
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
  addToFavorites(event, element) {
    if (event.checked == true) {
      this.favoriteBanks.push(element.ifsc);
      this.favoriteBanks = this.favoriteBanks.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
    }
    if (event.checked == false) {
      this.favoriteBanks = this.favoriteBanks.filter(function(e) { return e !== element.ifsc })
    }
    localStorage.setItem('favBanks', JSON.stringify(this.favoriteBanks));
  }

  isfav(element) {
    return this.favoriteBanks.find(ele => ele == element.ifsc);
  }
}

