import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { List5Component } from './list5/list5.component';
import { ListItem5Component } from './list-item5/list-item5.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatListModule, MatIconModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { BankService } from '../services/bank.service';

@NgModule({
  imports: [
    CommonModule,    
    MatListModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [
    CounterComponent,
    List5Component,
    ListItem5Component,
    SearchBarComponent,
  ],
  exports:[CounterComponent,SearchBarComponent,List5Component],
  providers:[DataService,BankService]
})
export class ComponentsModule { }
