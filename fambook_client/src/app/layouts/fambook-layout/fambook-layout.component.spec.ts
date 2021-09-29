import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FambookLayoutComponent } from './fambook-layout.component';

describe('FambookLayoutComponent', () => {
  let component: FambookLayoutComponent;
  let fixture: ComponentFixture<FambookLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FambookLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FambookLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
