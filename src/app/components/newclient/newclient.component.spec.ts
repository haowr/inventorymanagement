import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewclientComponent } from './newclient.component';

describe('NewclientComponent', () => {
  let component: NewclientComponent;
  let fixture: ComponentFixture<NewclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
