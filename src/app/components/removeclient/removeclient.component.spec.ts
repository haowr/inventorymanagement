import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveclientComponent } from './removeclient.component';

describe('RemoveclientComponent', () => {
  let component: RemoveclientComponent;
  let fixture: ComponentFixture<RemoveclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
