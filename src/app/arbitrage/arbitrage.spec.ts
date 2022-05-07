import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitragesComponent } from './arbitrage.component';

describe('ArbitreService', () => {
  let component: ArbitragesComponent;
  let fixture: ComponentFixture<ArbitragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbitragesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
