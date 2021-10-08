import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FammembersComponent } from './fammembers.component';

describe('FammembersComponent', () => {
  let component: FammembersComponent;
  let fixture: ComponentFixture<FammembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FammembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FammembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
