import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitresComponent } from './arbitres.component';

describe('ArbitreService', () => {
  let component: ArbitresComponent;
  let fixture: ComponentFixture<ArbitresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbitresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
