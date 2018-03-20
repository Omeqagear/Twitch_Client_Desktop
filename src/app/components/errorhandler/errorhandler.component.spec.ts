import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorhandlerComponent } from './errorhandler.component';

describe('ErrorhandlerComponent', () => {
  let component: ErrorhandlerComponent;
  let fixture: ComponentFixture<ErrorhandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorhandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorhandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
