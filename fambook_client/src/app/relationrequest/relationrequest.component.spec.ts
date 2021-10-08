import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationrequestComponent } from './relationrequest.component';

describe('RelationrequestComponent', () => {
  let component: RelationrequestComponent;
  let fixture: ComponentFixture<RelationrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
