import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifydaialogComponent } from './notifydaialog.component';

describe('NotifydaialogComponent', () => {
  let component: NotifydaialogComponent;
  let fixture: ComponentFixture<NotifydaialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifydaialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifydaialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
