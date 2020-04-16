import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentsViewComponent } from './opponents-view.component';
import { MaterialModule } from 'src/app/material.module';

describe('OpponentsViewComponent', () => {
  let component: OpponentsViewComponent;
  let fixture: ComponentFixture<OpponentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpponentsViewComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
