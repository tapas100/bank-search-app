import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatCheckboxModule, MatListModule, MatButtonModule, MatRippleModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, MatTableModule, MatSlideToggleModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule
  ],
  declarations: [],
  exports:[
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
