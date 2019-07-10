import { Component } from '@angular/core';

import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadComplete: boolean = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.loadStatus$.subscribe(res => {
      setTimeout(() => {
        this.loadComplete = res;
      },3000)
    })
  }
  ngOnInit(): void {
     
    this.loaderService.handleLoader(true);
    
  }
}

