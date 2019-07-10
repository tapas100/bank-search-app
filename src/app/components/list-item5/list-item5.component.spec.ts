import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItem5Component } from './list-item5.component';

describe('ListItem5Component', () => {
  let component: ListItem5Component;
  let fixture: ComponentFixture<ListItem5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItem5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItem5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
