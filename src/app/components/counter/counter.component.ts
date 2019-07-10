import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() countTo: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.countTo.previousValue != changes.countTo.currentValue) {
      this.countTo = changes.countTo.currentValue;
      $('.counter').attr("data-count", this.countTo);
      this.initCounter();
    console.log('#########', this.countTo, changes);

    }
  }

  initCounter() {
    $('.counter').each(function() {
      var $this = $(this),
          countTo = $this.attr('data-count')
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
    
      {
    
        duration: 5000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
          //alert('finished');
        }
    
      });  
      
      
    
    });
  }

}
