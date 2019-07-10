import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list5',
  templateUrl: './list5.component.html',
  styleUrls: ['./list5.component.scss']
})
export class List5Component implements OnInit {
  @Input() listData:any;
  constructor() { }

  ngOnInit() {
  }

}
