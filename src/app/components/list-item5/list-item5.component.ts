import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-list-item5',
  templateUrl: './list-item5.component.html',
  styleUrls: ['./list-item5.component.scss']
})
export class ListItem5Component implements OnInit {
  @Input() listItemData: any;
  constructor() { }

  ngOnInit() {
  }


}
