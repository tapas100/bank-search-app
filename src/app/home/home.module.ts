import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../components/components.module';
import { MatPaginatorModule, MatTableModule, MatIconModule, MatSlideToggleModule, MatButtonModule } from '@angular/material';
import { DataService } from '../services/data.service';
import { BankService } from '../services/bank.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  declarations: [HomeComponent],
  exports:[HomeComponent],
  providers:[DataService,BankService]
})
export class HomeModule { }
