import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaPage } from './historia';

describe('HistoriaPage', () => {
  let component: HistoriaPage;
  let fixture: ComponentFixture<HistoriaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
