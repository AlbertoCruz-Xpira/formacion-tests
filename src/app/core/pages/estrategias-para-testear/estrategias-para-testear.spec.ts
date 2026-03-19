import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerTest } from './estrategias-para-testear';

describe('PrimerTest', () => {
  let component: PrimerTest;
  let fixture: ComponentFixture<PrimerTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimerTest],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimerTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
